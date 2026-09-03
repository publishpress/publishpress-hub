---
name: wp-plugin-security-auditor
description: WordPress plugin security audit protocol (GHSA output)
---

# WP Plugin Security Auditor (GHSA format)

Use these instructions when the user requests a security audit / security review of this WordPress plugin, or after implementing sensitive functionality (REST/AJAX endpoints, auth/nonce flows, file operations, remote requests, license handling, DB writes).

## Mission

Conduct a thorough security audit of WordPress plugin code, identifying vulnerabilities and generating findings in GitHub Security Advisory (GHSA) format. The analysis must be methodical, comprehensive, and actionable.

## Directories to Exclude

NEVER analyze code in these directories:
- `/vendor/`
- `/lib/vendor/`
- `/dist/`
- `/.git/`
- `/dev-workspace/`
- `/node_modules/`

## Security Audit Methodology

### 1. Reconnaissance Phase
- Identify the plugin's entry points (main plugin file, REST API endpoints, AJAX handlers, shortcodes, widgets)
- Map user input sources (GET, POST, COOKIE, REQUEST, FILES, headers)
- Identify privileged operations and capability checks
- Note database interactions and file operations

### 2. Vulnerability Categories to Analyze

**Critical Priority:**
- SQL Injection (direct queries, improper `$wpdb` usage, missing `prepare()`)
- Remote Code Execution (eval, create_function, unserialize, file inclusion)
- Authentication Bypass (broken capability checks, nonce verification failures)
- Arbitrary File Upload/Write/Delete
- Object Injection via `unserialize()`

**High Priority:**
- Cross-Site Scripting (XSS) - Stored, Reflected, DOM-based
- Cross-Site Request Forgery (CSRF) - missing/improper nonce verification
- Insecure Direct Object Reference (IDOR)
- Path Traversal
- Server-Side Request Forgery (SSRF)
- Privilege Escalation

**Medium Priority:**
- Information Disclosure (debug info, stack traces, sensitive data exposure)
- Insecure Cryptographic Storage
- Missing Access Controls on AJAX/REST endpoints
- Open Redirect
- XML External Entity (XXE) Processing

**Low Priority:**
- Security Misconfigurations
- Missing Security Headers recommendations
- Deprecated function usage
- Insufficient Logging

### 3. WordPress-Specific Checks

- Verify all user input is sanitized using appropriate functions (`sanitize_text_field`, `sanitize_email`, `absint`, etc.)
- Verify all output is escaped using appropriate functions (`esc_html`, `esc_attr`, `esc_url`, `wp_kses`, etc.)
- Check that `$wpdb->prepare()` is used for all dynamic SQL queries
- Verify nonce implementation on all form submissions and AJAX handlers
- Check capability verification (`current_user_can`) before privileged operations
- Analyze REST API `permission_callback` implementations
- Review hooks and filters for potential injection points
- Check for proper use of `wp_remote_*` functions vs. curl

## Output Format: GitHub Security Advisory

For EACH vulnerability found, generate a report in this exact format:

```markdown
## Security Advisory

### Summary
[One-line description of the vulnerability]

### Severity
[Critical / High / Medium / Low]

### CVSS Score
[Calculate CVSS 3.1 score, e.g., 8.8 (High)]

### CWE
[CWE ID and name, e.g., CWE-89: SQL Injection]

### Affected Versions
[Version range or "all versions" based on code analysis]

### Vulnerability Details

**Type:** [Vulnerability type]
**Location:** [File path and line number(s)]
**Attack Vector:** [Network/Local]
**User Interaction:** [Required/None]
**Privileges Required:** [None/Low/High]

### Description
[Detailed technical description of the vulnerability, explaining:
- What the vulnerable code does
- Why it's vulnerable
- What an attacker could achieve]

### Proof of Concept
[Provide specific steps or example payloads to demonstrate the vulnerability]

### Vulnerable Code
```php
[Exact code snippet showing the vulnerable code with file path and line numbers]
```

### Remediation
[Specific code fix with corrected code example]

```php
[Fixed code snippet]
```

### References
- [Relevant OWASP links]
- [WordPress security documentation]
- [Any other relevant references]
```

## Report File Output

For each vulnerability discovered, create a **separate markdown file** in the `/security-audit/` directory.

### File Naming Convention

Use this format: `[plugin-name]-[###]-[SEVERITY]-[short-description].md`

**Examples:**
- `publishpress-hub-statistics-001-HIGH-public-rest-api-information-disclosure.md`
- `publishpress-hub-statistics-002-CRITICAL-sql-injection-custom-query.md`
- `publishpress-hub-statistics-003-MODERATE-xss-dangerouslySetInnerHTML-weak-sanitization.md`

**Rules:**
- Number issues sequentially starting from 001
- Severity in UPPERCASE: CRITICAL, HIGH, MODERATE, LOW
- Description in lowercase with hyphens (kebab-case)
- Keep descriptions concise but descriptive
- Ensure each file contains exactly ONE vulnerability report

### File Contents

Each report file must contain the complete Security Advisory in the format specified above, including all sections from Summary through References.

## Quality Assurance

### Before Reporting
1. Verify the vulnerability is exploitable, not just theoretical
2. Confirm the code path is reachable by users
3. Check if WordPress core or existing sanitization prevents exploitation
4. Validate that your remediation actually fixes the issue
5. Ensure CVSS score accurately reflects the impact

### False Positive Avoidance
- Check if data is sanitized before the vulnerable function
- Verify capability checks aren't performed earlier in the call stack
- Confirm nonces aren't verified in parent functions
- Check for output escaping before assuming XSS

## Interaction Protocol

- If you need access to additional files to trace data flow, request them
- If a vulnerability's severity is unclear, explain your reasoning
- If you find patterns that suggest systemic issues, highlight them
- Always provide actionable remediation, not just problem identification
- When uncertain about exploitability, err on the side of reporting with caveats

