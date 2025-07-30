#!/usr/bin/env bash

set -e

# Load environment variables from .env file
if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo ".env file not found!"
    exit 1
fi

API_URL="https://developers.hostinger.com/api/"
DOMAIN="${HOSTINGER_DOMAIN}"
API_KEY="${HOSTINGER_API_KEY}"
IP_ADDRESS=${HOSTINGER_VPS_IP}

api_request() {
    local endpoint="$1"
    local method="$2"
    local data="$3"
    shift 3  # Remove first 3 arguments

    # Build headers array
    local headers=(
        "Authorization: Bearer ${API_KEY}"
        "Content-Type: application/json"
    )

    # Add any additional headers passed as arguments
    if [[ $# -gt 0 ]]; then
        headers+=("$@")
    fi

    # Build curl command with headers
    local curl_cmd="curl -s"
    for header in "${headers[@]}"; do
        curl_cmd+=" -H \"$header\""
    done

    curl_cmd+=" -X \"$method\""
    if [[ -n "$data" ]]; then
        curl_cmd+=" -d '$data'"
    fi
    curl_cmd+=" \"${API_URL}${endpoint}\""

    # Execute the curl command and capture both response and HTTP status code
    response=$(eval "$curl_cmd -w '\n%{http_code}'")
    http_status=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [[ "$http_status" != "200" ]]; then
        echo "Error: Received HTTP status $http_status"
        echo "Response body:"
        echo "$body"
        echo "--------------------------------"
        echo "curl_cmd: $curl_cmd"
        return 1
    fi

    echo "$body"
}

list_a_records() {
    local endpoint="dns/v1/zones/${DOMAIN}"
    local response=$(api_request "$endpoint" "GET" "")

    check_response_is_valid_json "$response"

    local records=$(echo "$response" | jq -c '.[]')

    # Get only A records
    local a_records=$(echo "$records" | jq -c 'select(.type == "A")')

    # Ignore the record if name = @
    a_records=$(echo "$a_records" | jq -c 'select(.name != "@")')

    # Print header
    printf "%-30s %-16s %-8s\n" "Name" "Content" "TTL"
    printf "%-30s %-16s %-8s\n" "------------------------------" "----------------" "--------"
    # Print each A record as a table row
    echo "$a_records" | jq -r '[.name, .records[0].content, (.ttl // .zone_ttl // .zoneTTL // "N/A")] | @tsv' | while IFS=$'\t' read -r name content ttl; do
        printf "%-30s %-16s %-8s\n" "$name" "$content" "$ttl"
    done
}

check_response_is_valid_json() {
    local response="$1"
    if ! echo "$response" | jq -e . >/dev/null 2>&1; then
        echo "Invalid JSON response:"
        echo "$response"
        return 1
    fi
    return 0
}

add_subdomain() {
    local subdomain="$1"
    echo "Adding subdomain: $subdomain to $DOMAIN as A record with IP address: $IP_ADDRESS"

    # Get existing records first
    local endpoint="dns/v1/zones/${DOMAIN}"
    local existing_response=$(api_request "$endpoint" "GET" "")

    if [[ $? -ne 0 ]]; then
        echo "Failed to get existing records"
        return 1
    fi

    # Create the new zone record
    local new_zone_record=$(cat <<EOF
{
  "name": "${subdomain}",
  "type": "A",
  "ttl": 14400,
  "records": [
    {
      "content": "${IP_ADDRESS}"
    }
  ]
}
EOF
)

    # Add the new record to existing records
    local all_records=$(echo "$existing_response" | jq --argjson new_record "$new_zone_record" '. += [$new_record]')

    # Update the zone with all records
    local update_data=$(cat <<EOF
{
  "overwrite": true,
  "zone": $(echo "$all_records" | jq -c '.')
}
EOF
)

    local response=$(api_request "dns/v1/zones/${DOMAIN}" "PUT" "$update_data")

    if [[ $? -eq 0 ]]; then
        echo "Successfully added A record for $subdomain.$DOMAIN"
    else
        echo "Failed to add A record"
    fi
}

help() {
    echo "Usage: $0 list | add-subdomain <subdomain>"
}

# Command: list
if [[ "$1" == "list" ]]; then
    list_a_records
    exit $?
fi

# Command: add-subdomain
if [[ "$1" == "add-subdomain" ]]; then
    if [[ -z "$2" ]]; then
        echo "Usage: $0 add-subdomain <subdomain>"
        exit 1
    fi
    SUBDOMAIN="$2"

    add_subdomain "$SUBDOMAIN"
fi

# Command: help
if [[ "$1" == "help" ]]; then
    help
fi

# If no command is provided, show help
if [[ -z "$1" ]]; then
    help
fi
