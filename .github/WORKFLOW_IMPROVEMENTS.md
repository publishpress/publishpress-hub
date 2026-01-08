# GitHub Actions Workflow Improvements

## Problem
The GitHub Actions workflows were failing intermittently with "WordPress failed to become ready" errors after waiting 90 seconds (30 attempts × 3 seconds).

## Root Cause
- GitHub Actions runners have varying performance and resource constraints
- Docker container startup and WordPress installation can be slower in CI environments than locally
- The default timeout (90 seconds) was insufficient for consistent success

## Improvements Made

### 1. Extended Timeout for CI Environments
**File: `.github/workflows/code-test.yml`**
- Increased timeout to 60 attempts × 5 seconds = 300 seconds (5 minutes)
- Set via environment variables: `WP_READY_MAX_ATTEMPTS=60` and `WP_READY_INTERVAL=5`
- Added step-level timeout of 10 minutes for safety

### 2. Enhanced Diagnostics
**File: `dev-workspace/scripts/env.sh`**
- Made timeout values configurable via environment variables
- Added detailed diagnostic output on failure:
  - Container status
  - Recent logs from wpcli container (last 50 lines)
  - Recent logs from wp container (last 30 lines)
  - Directory structure information
- Added periodic directory listing to help diagnose marker file issues

### 3. Improved Error Visibility
**File: `.github/workflows/code-test.yml`**
- Added automatic log collection on workflow failure
- Shows logs from all test containers (test-wp, test-wpcli, test-db)
- Helps diagnose issues without needing to enable tmate debugging

### 4. Job-Level Timeouts
**Files: `.github/workflows/code-test.yml`, `.github/workflows/deploy.yml`**
- Added timeout-minutes to all test steps:
  - Unit tests: 5 minutes
  - Integration tests: 10 minutes
  - API tests: 5 minutes
  - Deploy job: 30 minutes
- Prevents workflows from hanging indefinitely

## Configuration

### Local Development
The default values remain unchanged for local development:
- `WP_READY_MAX_ATTEMPTS=30` (90 seconds total)
- `WP_READY_INTERVAL=3`

### CI Environment
Override via environment variables in GitHub Actions:
```yaml
env:
  WP_READY_MAX_ATTEMPTS: 60
  WP_READY_INTERVAL: 5
```

## Testing
To test the improvements:
1. Push to any branch to trigger the test workflow
2. Monitor the "Start services" step duration
3. Check that WordPress becomes ready within the extended timeout
4. If failures occur, review the diagnostic output in the logs

## Rollback
If these changes cause issues, you can:
1. Revert the environment variable changes in `.github/workflows/code-test.yml`
2. The script will fall back to original timeout values (30 attempts × 3 seconds)

## Additional Recommendations

### For Future Optimization
1. **Image Caching**: Consider using `actions/cache` to cache pulled Docker images between runs
2. **Parallel Test Execution**: Split tests into multiple jobs that run in parallel
3. **Health Check Tuning**: Review Docker compose healthcheck intervals and retries
4. **Use Docker Hub Registry Mirror**: Configure a registry mirror to speed up image pulls

### Monitoring
- Track workflow run times in GitHub Actions insights
- Monitor failure rates to ensure improvements are effective
- Adjust timeout values based on observed patterns

