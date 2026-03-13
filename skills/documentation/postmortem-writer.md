# Skill: postmortem-writer

## Purpose
Generates blameless postmortems from incident timelines. Creates structured postmortem documents following SRE best practices for incident review.

## Inputs
- `incident_id`: Incident ID (e.g., INC-2024-042)
- `incident_data`: Optional timeline data (if not auto-fetched)
- `severity`: SEV1 | SEV2 | SEV3 | SEV4
- `duration`: Incident duration
- `affected_services`: List of affected services
- `include_timeline`: Include detailed timeline (default: true)
- `include_action_items`: Include action items section (default: true)

## Outputs
- Blameless postmortem document with:
  - Incident summary (title, date, severity, duration)
  - Impact assessment
  - Root cause analysis (what happened, why)
  - Detection timeline (when detected, by whom)
  - Response timeline
  - Recovery timeline
  - Contributing factors (no blame - process, tooling, communication)
  - Lessons learned
  - Action items with owners and due dates

## Tools Used
- `pagerduty-api`: Get incident timeline and responders
- `datadog-api`: Get incident-related metrics and alerts
- `slack-api`: Get incident channel messages
- `kubectl`: Get pod logs around incident time

## Read-Only
Yes. This skill reads incident data and generates postmortem documents. It may create action items in the tracking system but doesn't modify production resources.

## Example Invocations
```
postmortem-writer incident_id:INC-2024-042 severity:SEV1 duration:45m
postmortem-writer incident_id:INC-2024-108 severity:SEV2 affected_services:payments,api-gateway
/postmortem incident:INC-2024-042
```
