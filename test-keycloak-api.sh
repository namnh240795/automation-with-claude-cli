#!/bin/bash

# Keycloak Admin API Test Script
# Tests all endpoints of the Keycloak Admin API implementation

BASE_URL="http://localhost:3001/auth"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Helper functions
log_test() {
  echo -e "${YELLOW}[TEST $((TOTAL_TESTS + 1))]${NC} $1"
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
}

log_pass() {
  echo -e "${GREEN}✓ PASSED${NC}: $1"
  PASSED_TESTS=$((PASSED_TESTS + 1))
}

log_fail() {
  echo -e "${RED}✗ FAILED${NC}: $1"
  echo "  Response: $2"
  FAILED_TESTS=$((FAILED_TESTS + 1))
}

echo "=========================================="
echo "  Keycloak Admin API Test Suite"
echo "=========================================="
echo ""

# First, create a test user and get a JWT token
echo "Setting up test authentication..."
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Admin123!","first_name":"Admin","last_name":"User"}')

TOKEN=$(curl -s -X POST "$BASE_URL/signin" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Admin123!"}' | jq -r '.access_token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "Failed to get authentication token"
  exit 1
fi

echo -e "${GREEN}✓${NC} Authentication setup complete"
echo "Token: ${TOKEN:0:20}..."
echo ""

# Helper for API calls
api_call() {
  local method=$1
  local endpoint=$2
  local data=$3
  local expected_status=$4

  if [ -z "$data" ]; then
    response=$(curl -s -X "$method" "$BASE_URL$endpoint" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
  else
    response=$(curl -s -X "$method" "$BASE_URL$endpoint" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi

  status=$(echo "$response" | jq -r '.statusCode // .status_code // if .error then 401 else 200 end')

  if [ "$status" = "$expected_status" ] || [ "$status" = "200" ] && [ -z "$expected_status" ]; then
    log_pass "$method $endpoint"
    return 0
  else
    log_fail "$method $endpoint" "$response"
    return 1
  fi
}

# ============================================================================
# REALM TESTS
# ============================================================================
echo -e "\n${YELLOW}=== REALM MANAGEMENT TESTS ===${NC}"

# Create a test realm
log_test "Create realm"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"test-realm","enabled":true,"registration_allowed":true}')
REALM_ID=$(echo "$RESPONSE" | jq -r '.id // empty')
if [ -n "$REALM_ID" ]; then
  log_pass "Create realm" "$RESPONSE"
else
  log_fail "Create realm" "$RESPONSE"
fi

# List all realms
api_call "GET" "/api/v1/realms" "" "200"

# Get realm by ID
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID" "" "200"
fi

# Update realm
if [ -n "$REALM_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID" '{"registration_allowed":false}' "200"
fi

# Get realm attributes
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/attributes" "" "200"
fi

# Update realm attributes
if [ -n "$REALM_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID/attributes" '{"customAttribute":"customValue"}' "200"
fi

# Get realm SMTP config
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/smtp" "" "200"
fi

# Update realm SMTP config
if [ -n "$REALM_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID/smtp" '{"host":"smtp.example.com","port":"587"}' "200"
fi

# ============================================================================
# USER TESTS
# ============================================================================
echo -e "\n${YELLOW}=== USER MANAGEMENT TESTS ===${NC}"

# Create users
log_test "Create user in realm"
if [ -n "$REALM_ID" ]; then
  USER1_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms/$REALM_ID/users" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"username":"john.doe","email":"john@example.com","first_name":"John","last_name":"Doe","enabled":true}')
  USER1_ID=$(echo "$USER1_RESPONSE" | jq -r '.id // empty')
  if [ -n "$USER1_ID" ]; then
    log_pass "Create user" "$USER1_RESPONSE"
  else
    log_fail "Create user" "$USER1_RESPONSE"
  fi

  # Create second user
  USER2_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms/$REALM_ID/users" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"username":"jane.smith","email":"jane@example.com","first_name":"Jane","last_name":"Smith"}')
  USER2_ID=$(echo "$USER2_RESPONSE" | jq -r '.id // empty')
fi

# List users
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/users" "" "200"
fi

# Search users
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/users?search=john" "" "200"
fi

# Get user by ID
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/users/$USER1_ID" "" "200"
fi

# Update user
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID/users/$USER1_ID" '{"email":"john.doe.updated@example.com"}' "200"
fi

# Get user attributes
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/users/$USER1_ID/attributes" "" "200"
fi

# Update user attributes
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID/users/$USER1_ID/attributes" '{"department":"Engineering"}' "200"
fi

# Get user credentials
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/users/$USER1_ID/credentials" "" "200"
fi

# ============================================================================
# ROLE TESTS
# ============================================================================
echo -e "\n${YELLOW}=== ROLE MANAGEMENT TESTS ===${NC}"

# Create roles
log_test "Create role in realm"
if [ -n "$REALM_ID" ]; then
  ROLE1_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms/$REALM_ID/roles" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name":"admin","description":"Administrator role"}')
  ROLE1_ID=$(echo "$ROLE1_RESPONSE" | jq -r '.id // empty')
  if [ -n "$ROLE1_ID" ]; then
    log_pass "Create role" "$ROLE1_RESPONSE"
  else
    log_fail "Create role" "$ROLE1_RESPONSE"
  fi

  # Create second role
  ROLE2_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms/$REALM_ID/roles" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name":"user","description":"Standard user role"}')
  ROLE2_ID=$(echo "$ROLE2_RESPONSE" | jq -r '.id // empty')
fi

# List roles
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/roles" "" "200"
fi

# Get role by ID
if [ -n "$REALM_ID" ] && [ -n "$ROLE1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/roles/$ROLE1_ID" "" "200"
fi

# Update role
if [ -n "$REALM_ID" ] && [ -n "$ROLE1_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID/roles/$ROLE1_ID" '{"description":"Updated administrator role"}' "200"
fi

# Assign role to user
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ] && [ -n "$ROLE1_ID" ]; then
  api_call "POST" "/api/v1/realms/$REALM_ID/users/$USER1_ID/roles" "{\"role_ids\":[\"$ROLE1_ID\"]}" "200"
fi

# Get user roles
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/users/$USER1_ID/roles" "" "200"
fi

# ============================================================================
# GROUP TESTS
# ============================================================================
echo -e "\n${YELLOW}=== GROUP MANAGEMENT TESTS ===${NC}"

# Create groups
log_test "Create group in realm"
if [ -n "$REALM_ID" ]; then
  GROUP1_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms/$REALM_ID/groups" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name":"developers"}')
  GROUP1_ID=$(echo "$GROUP1_RESPONSE" | jq -r '.id // empty')
  if [ -n "$GROUP1_ID" ]; then
    log_pass "Create group" "$GROUP1_RESPONSE"
  else
    log_fail "Create group" "$GROUP1_RESPONSE"
  fi

  # Create second group
  GROUP2_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms/$REALM_ID/groups" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name":"managers"}')
  GROUP2_ID=$(echo "$GROUP2_RESPONSE" | jq -r '.id // empty')
fi

# List groups
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/groups" "" "200"
fi

# Get group by ID
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID" "" "200"
fi

# Update group
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID" '{"name":"senior-developers"}' "200"
fi

# Assign role to group
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ] && [ -n "$ROLE2_ID" ]; then
  api_call "POST" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID/roles" "{\"role_ids\":[\"$ROLE2_ID\"]}" "200"
fi

# Get group roles
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID/roles" "" "200"
fi

# Add user to group
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ] && [ -n "$USER2_ID" ]; then
  api_call "POST" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID/members/$USER2_ID" "" "200"
fi

# Get group members
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID/members" "" "200"
fi

# Get user groups
if [ -n "$REALM_ID" ] && [ -n "$USER2_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/users/$USER2_ID/groups" "" "200"
fi

# ============================================================================
# CLIENT TESTS
# ============================================================================
echo -e "\n${YELLOW}=== CLIENT MANAGEMENT TESTS ===${NC}"

# Create client
log_test "Create OAuth client"
if [ -n "$REALM_ID" ]; then
  CLIENT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/realms/$REALM_ID/clients" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "client_id": "test-client",
      "name": "Test Client",
      "enabled": true,
      "public_client": false,
      "standard_flow_enabled": true,
      "redirect_uris": ["http://localhost:3000/callback"],
      "web_origins": ["http://localhost:3000"]
    }')
  CLIENT_ID=$(echo "$CLIENT_RESPONSE" | jq -r '.id // empty')
  if [ -n "$CLIENT_ID" ]; then
    log_pass "Create client" "$CLIENT_RESPONSE"
  else
    log_fail "Create client" "$CLIENT_RESPONSE"
  fi
fi

# List clients
if [ -n "$REALM_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/clients" "" "200"
fi

# Get client by ID
if [ -n "$REALM_ID" ] && [ -n "$CLIENT_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/clients/$CLIENT_ID" "" "200"
fi

# Update client
if [ -n "$REALM_ID" ] && [ -n "$CLIENT_ID" ]; then
  api_call "PUT" "/api/v1/realms/$REALM_ID/clients/$CLIENT_ID" '{"description":"Updated test client"}' "200"
fi

# Get client redirect URIs
if [ -n "$REALM_ID" ] && [ -n "$CLIENT_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/clients/$CLIENT_ID/redirect-uris" "" "200"
fi

# Add redirect URI
if [ -n "$REALM_ID" ] && [ -n "$CLIENT_ID" ]; then
  api_call "POST" "/api/v1/realms/$REALM_ID/clients/$CLIENT_ID/redirect-uris" '{"uri":"http://localhost:4200/callback"}' "200"
fi

# Get client secret
if [ -n "$REALM_ID" ] && [ -n "$CLIENT_ID" ]; then
  api_call "GET" "/api/v1/realms/$REALM_ID/clients/$CLIENT_ID/secret" "" "200"
fi

# Regenerate client secret
if [ -n "$REALM_ID" ] && [ -n "$CLIENT_ID" ]; then
  api_call "POST" "/api/v1/realms/$REALM_ID/clients/$CLIENT_ID/secret/regenerate" "" "200"
fi

# ============================================================================
# CLEANUP TESTS
# ============================================================================
echo -e "\n${YELLOW}=== CLEANUP TESTS ===${NC}"

# Remove user from group
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ] && [ -n "$USER2_ID" ]; then
  api_call "DELETE" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID/members/$USER2_ID" "" "200"
fi

# Remove role from group
if [ -n "$REALM_ID" ] && [ -n "$GROUP1_ID" ] && [ -n "$ROLE2_ID" ]; then
  api_call "DELETE" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID/roles/$ROLE2_ID" "" "200"
fi

# Remove role from user
if [ -n "$REALM_ID" ] && [ -n "$USER1_ID" ]; then
  api_call "DELETE" "/api/v1/realms/$REALM_ID/users/$USER1_ID/roles" "{\"role_ids\":[\"$ROLE1_ID\"]}" "200"
fi

# Delete client
if [ -n "$REALM_ID" ] && [ -n "$CLIENT_ID" ]; then
  api_call "DELETE" "/api/v1/realms/$REALM_ID/clients/$CLIENT_ID" "" "200"
fi

# Delete groups
if [ -n "$REALM_ID" ]; then
  if [ -n "$GROUP1_ID" ]; then
    api_call "DELETE" "/api/v1/realms/$REALM_ID/groups/$GROUP1_ID" "" "200"
  fi
  if [ -n "$GROUP2_ID" ]; then
    api_call "DELETE" "/api/v1/realms/$REALM_ID/groups/$GROUP2_ID" "" "200"
  fi
fi

# Delete roles
if [ -n "$REALM_ID" ]; then
  if [ -n "$ROLE1_ID" ]; then
    api_call "DELETE" "/api/v1/realms/$REALM_ID/roles/$ROLE1_ID" "" "200"
  fi
  if [ -n "$ROLE2_ID" ]; then
    api_call "DELETE" "/api/v1/realms/$REALM_ID/roles/$ROLE2_ID" "" "200"
  fi
fi

# Delete users
if [ -n "$REALM_ID" ]; then
  if [ -n "$USER1_ID" ]; then
    api_call "DELETE" "/api/v1/realms/$REALM_ID/users/$USER1_ID" "" "200"
  fi
  if [ -n "$USER2_ID" ]; then
    api_call "DELETE" "/api/v1/realms/$REALM_ID/users/$USER2_ID" "" "200"
  fi
fi

# Delete realm attribute
if [ -n "$REALM_ID" ]; then
  api_call "DELETE" "/api/v1/realms/$REALM_ID/attributes/customAttribute" "" "200"
fi

# Delete realm
if [ -n "$REALM_ID" ]; then
  api_call "DELETE" "/api/v1/realms/$REALM_ID/$REALM_ID" "" "200"
fi

# ============================================================================
# SUMMARY
# ============================================================================
echo ""
echo "=========================================="
echo "  TEST SUMMARY"
echo "=========================================="
echo -e "Total Tests:  $TOTAL_TESTS"
echo -e "${GREEN}Passed:       $PASSED_TESTS${NC}"
echo -e "${RED}Failed:       $FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
  echo -e "${GREEN}All tests passed! ✓${NC}"
  exit 0
else
  echo -e "${RED}Some tests failed! ✗${NC}"
  exit 1
fi
