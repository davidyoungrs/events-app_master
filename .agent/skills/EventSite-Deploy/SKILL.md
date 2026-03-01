---
name: EventSite-Deploy
description: Automates the deployment of a new event site by updating config and data.
---

# EventSite-Deploy Skill

This skill automates the process of transforming the `event-app_master` template into a specific event instance.

## Workflow

### 1. Configuration Check
Ensure the following files are provided or available:
- `eventConfig.json`: Branding, contact info, and feature toggles.
- `schedule.csv`: The core event schedule.
- `discoverData.json`: (Optional) Customized places to eat, things to do, etc.
- `presenters.csv`: (Optional) List of speakers and their details.

### 2. Asset Preparation
Place the following assets in `public/`:
- `company_logo.svg`: The event logo.
- `hero_image.svg`: The home screen background.
- `favicon.ico`: The site favicon.

### 3. Execution Script
The skill uses a helper script to validate and swap data.

// turbo
```bash
# Example command to run the deployment helper
node .agent/skills/EventSite-Deploy/scripts/deploy.js --config path/to/new/config.json --schedule path/to/new/schedule.csv
```

## Deployment Steps for Agents

When a user asks to "Deploy a new event site" or "Create a site for Event X":

1. **Verify Source Data**: Read the provided `config.json` and `csv` files.
2. **Update Project Data**:
    - Overwrite `src/data/eventConfig.json` with the new config.
    - Overwrite `src/data/agenda.csv` with the new agenda.
    - (If provided) Update `src/data/discoverData.json`.
3. **Handle Assets**: If new images are provided, move them to the `public/` directory.
4. **Validation**:
    - Run `npm run build` to ensure the project still compiles.
    - Check for any missing fields in the new config that might break the UI.
5. **Report Success**: Provide the user with a summary of the changes and a link to the preview.

## Best Practices
- **Backup**: Always create a git branch for the new event before applying changes.
- **Dynamic Content**: Ensure all text on the site is fetched from the config/CSV; avoid any hardcoded strings in `.jsx` files.
- **Color Validation**: Verify that the `primaryColor` provided in the config has enough contrast against the dark background.
