# Manage License Modal Behavior Flow

## Overview
This diagram defines the behavior and flow of the Manage License modal based on whether a license key is already stored for the plugin.

```mermaid
---
config:
  layout: elk
---
flowchart TD
    A(["User clicks Manage License"]) --> B{"Is License Key Stored?"}
    B -- No --> C["Show modal to enter license key"]
    C --> D["User enters key & submits"]
    D --> E["Validate & Activate License"]
    E --> F["Is Valid and Acitvated License?"]
    H["Options: Edit"] --> C
    F -- No --> n1["Show error message"]
    n1 --> C
    F -- Yes --> n2["Store the license key"]
    n2 --> G["Show modal with license key"]
    J["Option: Deactivate"] --> C
    B -- Yes --> G
    G --> I{"License Active?"}
    I -- Yes --> J
    I -- No --> K["Option: Activate"]
    K --> n3["License Active?"]
    n3 -- Yes --> C
    n3 --> n4["Show error message"]
    n4 --> G
    F@{ shape: diam}
    n3@{ shape: diam}

```
