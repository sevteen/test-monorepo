#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

SEPARATOR="----------------------------------------"

# Run nx pretty-format-check and capture the output
output=$(nx format:check 2>&1)

# Capture the exit status
result=$?

# Check if the command failed
if [ $result -ne 0 ]; then
    echo -e "${RED}$SEPARATOR"
    echo -e "Error: Formatting check failed"
    echo -e "$SEPARATOR${NC}"
    echo -e "Files with formatting issues:\n$output\n"
    echo -e "${CYAN}Please run 'npx nx format:write' to fix formatting issues."
    exit $result
fi
echo -e "${GREEN}Formatting check passed successfully.${NC}"