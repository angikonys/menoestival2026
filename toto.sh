#!/bin/bash

# Ensure packwiz is initialized
if [ ! -f "pack.toml" ]; then
    echo "Error: pack.toml not found. Run 'packwiz init' first."
    exit 1
fi

# Process the URL list (urls.txt)
while IFS= read -r url || [ -n "$url" ]; do
    [[ -z "$url" ]] && continue
    
    echo "Processing: $url"
    
    if [[ "$url" == *"modrinth.com"* ]]; then
        # Use -y to auto-confirm dependencies
        packwiz modrinth add "$url" -y
        
    elif [[ "$url" == *"curseforge.com"* ]]; then
        # Use -y to auto-confirm dependencies
        packwiz curseforge add "$url" -y
        
    else
        echo "Warning: Unsupported URL: $url"
    fi
done < urls.txt

# Finalize the index
packwiz refresh
echo "All mods added and index refreshed."