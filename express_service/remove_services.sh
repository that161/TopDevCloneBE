#!/bin/bash

# List and remove Docker services with specific naming pattern
services=$(docker service ls | grep -E "express_service_(authentication|job|user|application|gateway|nginx-loadbalancer)" | awk '{print $1}')

if [ -n "$services" ]; then
    echo "Removing services: $services"
    echo "$services" | xargs docker service rm
else
    echo "No services found to remove."
fi
