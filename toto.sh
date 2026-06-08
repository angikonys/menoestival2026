#!/bin/bash

# Ensure packwiz is initialized in a fresh folder
if [ ! -f "pack.toml" ]; then
    echo "Error: pack.toml not found. Run 'packwiz init' first."
    exit 1
fi

# Process the URL list (urls.txt)
while IFS= read -r url || [ -n "$url" ]; do
    # Skip empty lines
    [[ -z "$url" ]] && continue
    
    echo "Processing: $url"
    
    if [[ "$url" == *"modrinth.com"* ]]; then
        # Extract slug for Modrinth
        slug=$(echo "$url" | sed -E 's|https?://modrinth\.com/mod/([^/]+).*|\1|')
        packwiz modrinth add "$slug"
        
    elif [[ "$url" == *"curseforge.com"* ]]; then
        # Add CurseForge projects directly
        packwiz curseforge add "$url"
        
    else
        echo "Warning: Unsupported or invalid URL: $url"
    fi
done < urls.txt

# Finalize the index
packwiz refresh
echo "All mods added and index refreshed."