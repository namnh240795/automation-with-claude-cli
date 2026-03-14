-- CreateTable
CREATE TABLE "admin_event_entity" (
    "id" VARCHAR(36) NOT NULL,
    "admin_event_time" BIGINT,
    "realm_id" VARCHAR(255),
    "operation_type" VARCHAR(255),
    "auth_realm_id" VARCHAR(255),
    "auth_client_id" VARCHAR(255),
    "auth_user_id" VARCHAR(255),
    "ip_address" VARCHAR(255),
    "resource_path" VARCHAR(2550),
    "representation" TEXT,
    "error" VARCHAR(255),
    "resource_type" VARCHAR(64),
    "details_json" TEXT,

    CONSTRAINT "constraint_admin_event_entity" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "associated_policy" (
    "policy_id" VARCHAR(36) NOT NULL,
    "associated_policy_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_farsrpap" PRIMARY KEY ("policy_id","associated_policy_id")
);

-- CreateTable
CREATE TABLE "authentication_execution" (
    "id" VARCHAR(36) NOT NULL,
    "alias" VARCHAR(255),
    "authenticator" VARCHAR(36),
    "realm_id" VARCHAR(36),
    "flow_id" VARCHAR(36),
    "requirement" INTEGER,
    "priority" INTEGER,
    "authenticator_flow" BOOLEAN NOT NULL DEFAULT false,
    "auth_flow_id" VARCHAR(36),
    "auth_config" VARCHAR(36),

    CONSTRAINT "constraint_auth_exec_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentication_flow" (
    "id" VARCHAR(36) NOT NULL,
    "alias" VARCHAR(255),
    "description" VARCHAR(255),
    "realm_id" VARCHAR(36),
    "provider_id" VARCHAR(36) NOT NULL DEFAULT 'basic-flow',
    "top_level" BOOLEAN NOT NULL DEFAULT false,
    "built_in" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "constraint_auth_flow_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authenticator_config" (
    "id" VARCHAR(36) NOT NULL,
    "alias" VARCHAR(255),
    "realm_id" VARCHAR(36),

    CONSTRAINT "constraint_auth_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authenticator_config_entry" (
    "authenticator_id" VARCHAR(36) NOT NULL,
    "value" TEXT,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_auth_cfg_pk" PRIMARY KEY ("authenticator_id","name")
);

-- CreateTable
CREATE TABLE "broker_link" (
    "identity_provider" VARCHAR(255) NOT NULL,
    "storage_provider_id" VARCHAR(255),
    "realm_id" VARCHAR(36) NOT NULL,
    "broker_user_id" VARCHAR(255),
    "broker_username" VARCHAR(255),
    "token" TEXT,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "constr_broker_link_pk" PRIMARY KEY ("identity_provider","user_id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" VARCHAR(36) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "full_scope_allowed" BOOLEAN NOT NULL DEFAULT false,
    "client_id" VARCHAR(255),
    "not_before" INTEGER,
    "public_client" BOOLEAN NOT NULL DEFAULT false,
    "secret" VARCHAR(255),
    "base_url" VARCHAR(255),
    "bearer_only" BOOLEAN NOT NULL DEFAULT false,
    "management_url" VARCHAR(255),
    "surrogate_auth_required" BOOLEAN NOT NULL DEFAULT false,
    "realm_id" VARCHAR(36),
    "protocol" VARCHAR(255),
    "node_rereg_timeout" INTEGER DEFAULT 0,
    "frontchannel_logout" BOOLEAN NOT NULL DEFAULT false,
    "consent_required" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(255),
    "service_accounts_enabled" BOOLEAN NOT NULL DEFAULT false,
    "client_authenticator_type" VARCHAR(255),
    "root_url" VARCHAR(255),
    "description" VARCHAR(255),
    "registration_token" VARCHAR(255),
    "standard_flow_enabled" BOOLEAN NOT NULL DEFAULT true,
    "implicit_flow_enabled" BOOLEAN NOT NULL DEFAULT false,
    "direct_access_grants_enabled" BOOLEAN NOT NULL DEFAULT false,
    "always_display_in_console" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "constraint_7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_attributes" (
    "client_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" TEXT,

    CONSTRAINT "constraint_3c" PRIMARY KEY ("client_id","name")
);

-- CreateTable
CREATE TABLE "client_auth_flow_bindings" (
    "client_id" VARCHAR(36) NOT NULL,
    "flow_id" VARCHAR(36),
    "binding_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "c_cli_flow_bind" PRIMARY KEY ("client_id","binding_name")
);

-- CreateTable
CREATE TABLE "client_initial_access" (
    "id" VARCHAR(36) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "timestamp" INTEGER,
    "expiration" INTEGER,
    "count" INTEGER,
    "remaining_count" INTEGER,

    CONSTRAINT "cnstr_client_init_acc_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_node_registrations" (
    "client_id" VARCHAR(36) NOT NULL,
    "value" INTEGER,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_84" PRIMARY KEY ("client_id","name")
);

-- CreateTable
CREATE TABLE "client_scope" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255),
    "realm_id" VARCHAR(36),
    "description" VARCHAR(255),
    "protocol" VARCHAR(255),

    CONSTRAINT "pk_cli_template" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_scope_attributes" (
    "scope_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(2048),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_cl_tmpl_attr" PRIMARY KEY ("scope_id","name")
);

-- CreateTable
CREATE TABLE "client_scope_client" (
    "client_id" VARCHAR(255) NOT NULL,
    "scope_id" VARCHAR(255) NOT NULL,
    "default_scope" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "c_cli_scope_bind" PRIMARY KEY ("client_id","scope_id")
);

-- CreateTable
CREATE TABLE "client_scope_role_mapping" (
    "scope_id" VARCHAR(36) NOT NULL,
    "role_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "pk_template_scope" PRIMARY KEY ("scope_id","role_id")
);

-- CreateTable
CREATE TABLE "component" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255),
    "parent_id" VARCHAR(36),
    "provider_id" VARCHAR(36),
    "provider_type" VARCHAR(255),
    "realm_id" VARCHAR(36),
    "sub_type" VARCHAR(255),

    CONSTRAINT "constr_component_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component_config" (
    "id" VARCHAR(36) NOT NULL,
    "component_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" TEXT,

    CONSTRAINT "constr_component_config_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "composite_role" (
    "composite" VARCHAR(36) NOT NULL,
    "child_role" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_composite_role" PRIMARY KEY ("composite","child_role")
);

-- CreateTable
CREATE TABLE "credential" (
    "id" VARCHAR(36) NOT NULL,
    "salt" BYTEA,
    "type" VARCHAR(255),
    "user_id" VARCHAR(36),
    "created_date" BIGINT,
    "user_label" VARCHAR(255),
    "secret_data" TEXT,
    "credential_data" TEXT,
    "priority" INTEGER,

    CONSTRAINT "constraint_f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "databasechangelog" (
    "id" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "dateexecuted" TIMESTAMP(6) NOT NULL,
    "orderexecuted" INTEGER NOT NULL,
    "exectype" VARCHAR(10) NOT NULL,
    "md5sum" VARCHAR(35),
    "description" VARCHAR(255),
    "comments" VARCHAR(255),
    "tag" VARCHAR(255),
    "liquibase" VARCHAR(20),
    "contexts" VARCHAR(255),
    "labels" VARCHAR(255),
    "deployment_id" VARCHAR(10)
);

-- CreateTable
CREATE TABLE "databasechangeloglock" (
    "id" INTEGER NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "lockgranted" TIMESTAMP(6),
    "lockedby" VARCHAR(255),

    CONSTRAINT "databasechangeloglock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "default_client_scope" (
    "realm_id" VARCHAR(36) NOT NULL,
    "scope_id" VARCHAR(36) NOT NULL,
    "default_scope" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "r_def_cli_scope_bind" PRIMARY KEY ("realm_id","scope_id")
);

-- CreateTable
CREATE TABLE "event_entity" (
    "id" VARCHAR(36) NOT NULL,
    "client_id" VARCHAR(255),
    "details_json" VARCHAR(2550),
    "error" VARCHAR(255),
    "ip_address" VARCHAR(255),
    "realm_id" VARCHAR(255),
    "session_id" VARCHAR(255),
    "event_time" BIGINT,
    "type" VARCHAR(255),
    "user_id" VARCHAR(255),
    "details_json_long_value" TEXT,

    CONSTRAINT "constraint_4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fed_user_attribute" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "storage_provider_id" VARCHAR(36),
    "value" VARCHAR(2024),
    "long_value_hash" BYTEA,
    "long_value_hash_lower_case" BYTEA,
    "long_value" TEXT,

    CONSTRAINT "constr_fed_user_attr_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fed_user_consent" (
    "id" VARCHAR(36) NOT NULL,
    "client_id" VARCHAR(255),
    "user_id" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "storage_provider_id" VARCHAR(36),
    "created_date" BIGINT,
    "last_updated_date" BIGINT,
    "client_storage_provider" VARCHAR(36),
    "external_client_id" VARCHAR(255),

    CONSTRAINT "constr_fed_user_consent_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fed_user_consent_cl_scope" (
    "user_consent_id" VARCHAR(36) NOT NULL,
    "scope_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_fgrntcsnt_clsc_pm" PRIMARY KEY ("user_consent_id","scope_id")
);

-- CreateTable
CREATE TABLE "fed_user_credential" (
    "id" VARCHAR(36) NOT NULL,
    "salt" BYTEA,
    "type" VARCHAR(255),
    "created_date" BIGINT,
    "user_id" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "storage_provider_id" VARCHAR(36),
    "user_label" VARCHAR(255),
    "secret_data" TEXT,
    "credential_data" TEXT,
    "priority" INTEGER,

    CONSTRAINT "constr_fed_user_cred_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fed_user_group_membership" (
    "group_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "storage_provider_id" VARCHAR(36),

    CONSTRAINT "constr_fed_user_group" PRIMARY KEY ("group_id","user_id")
);

-- CreateTable
CREATE TABLE "fed_user_required_action" (
    "required_action" VARCHAR(255) NOT NULL DEFAULT ' ',
    "user_id" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "storage_provider_id" VARCHAR(36),

    CONSTRAINT "constr_fed_required_action" PRIMARY KEY ("required_action","user_id")
);

-- CreateTable
CREATE TABLE "fed_user_role_mapping" (
    "role_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "storage_provider_id" VARCHAR(36),

    CONSTRAINT "constr_fed_user_role" PRIMARY KEY ("role_id","user_id")
);

-- CreateTable
CREATE TABLE "federated_identity" (
    "identity_provider" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36),
    "federated_user_id" VARCHAR(255),
    "federated_username" VARCHAR(255),
    "token" TEXT,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_40" PRIMARY KEY ("identity_provider","user_id")
);

-- CreateTable
CREATE TABLE "federated_user" (
    "id" VARCHAR(255) NOT NULL,
    "storage_provider_id" VARCHAR(255),
    "realm_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constr_federated_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_attribute" (
    "id" VARCHAR(36) NOT NULL DEFAULT 'sybase-needs-something-here',
    "name" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255),
    "group_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_group_attribute_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_role_mapping" (
    "role_id" VARCHAR(36) NOT NULL,
    "group_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_group_role" PRIMARY KEY ("role_id","group_id")
);

-- CreateTable
CREATE TABLE "identity_provider" (
    "internal_id" VARCHAR(36) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "provider_alias" VARCHAR(255),
    "provider_id" VARCHAR(255),
    "store_token" BOOLEAN NOT NULL DEFAULT false,
    "authenticate_by_default" BOOLEAN NOT NULL DEFAULT false,
    "realm_id" VARCHAR(36),
    "add_token_role" BOOLEAN NOT NULL DEFAULT true,
    "trust_email" BOOLEAN NOT NULL DEFAULT false,
    "first_broker_login_flow_id" VARCHAR(36),
    "post_broker_login_flow_id" VARCHAR(36),
    "provider_display_name" VARCHAR(255),
    "link_only" BOOLEAN NOT NULL DEFAULT false,
    "organization_id" VARCHAR(255),
    "hide_on_login" BOOLEAN DEFAULT false,

    CONSTRAINT "constraint_2b" PRIMARY KEY ("internal_id")
);

-- CreateTable
CREATE TABLE "identity_provider_config" (
    "identity_provider_id" VARCHAR(36) NOT NULL,
    "value" TEXT,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_d" PRIMARY KEY ("identity_provider_id","name")
);

-- CreateTable
CREATE TABLE "identity_provider_mapper" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "idp_alias" VARCHAR(255) NOT NULL,
    "idp_mapper_name" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_idpm" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idp_mapper_config" (
    "idp_mapper_id" VARCHAR(36) NOT NULL,
    "value" TEXT,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_idpmconfig" PRIMARY KEY ("idp_mapper_id","name")
);

-- CreateTable
CREATE TABLE "keycloak_group" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255),
    "parent_group" VARCHAR(36) NOT NULL,
    "realm_id" VARCHAR(36),
    "type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "constraint_group" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keycloak_role" (
    "id" VARCHAR(36) NOT NULL,
    "client_realm_constraint" VARCHAR(255),
    "client_role" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(255),
    "name" VARCHAR(255),
    "realm_id" VARCHAR(255),
    "client" VARCHAR(36),
    "realm" VARCHAR(36),

    CONSTRAINT "constraint_a" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migration_model" (
    "id" VARCHAR(36) NOT NULL,
    "version" VARCHAR(36),
    "update_time" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "constraint_migmod" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offline_client_session" (
    "user_session_id" VARCHAR(36) NOT NULL,
    "client_id" VARCHAR(255) NOT NULL,
    "offline_flag" VARCHAR(4) NOT NULL,
    "timestamp" INTEGER,
    "data" TEXT,
    "client_storage_provider" VARCHAR(36) NOT NULL DEFAULT 'local',
    "external_client_id" VARCHAR(255) NOT NULL DEFAULT 'local',
    "version" INTEGER DEFAULT 0,

    CONSTRAINT "constraint_offl_cl_ses_pk3" PRIMARY KEY ("user_session_id","client_id","client_storage_provider","external_client_id","offline_flag")
);

-- CreateTable
CREATE TABLE "offline_user_session" (
    "user_session_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "created_on" INTEGER NOT NULL,
    "offline_flag" VARCHAR(4) NOT NULL,
    "data" TEXT,
    "last_session_refresh" INTEGER NOT NULL DEFAULT 0,
    "broker_session_id" VARCHAR(1024),
    "version" INTEGER DEFAULT 0,

    CONSTRAINT "constraint_offl_us_ses_pk2" PRIMARY KEY ("user_session_id","offline_flag")
);

-- CreateTable
CREATE TABLE "org" (
    "id" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "realm_id" VARCHAR(255) NOT NULL,
    "group_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(4000),
    "alias" VARCHAR(255) NOT NULL,
    "redirect_url" VARCHAR(2048),

    CONSTRAINT "ORG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "org_domain" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "org_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "ORG_DOMAIN_pkey" PRIMARY KEY ("id","name")
);

-- CreateTable
CREATE TABLE "policy_config" (
    "policy_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" TEXT,

    CONSTRAINT "constraint_dpc" PRIMARY KEY ("policy_id","name")
);

-- CreateTable
CREATE TABLE "protocol_mapper" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "protocol" VARCHAR(255) NOT NULL,
    "protocol_mapper_name" VARCHAR(255) NOT NULL,
    "client_id" VARCHAR(36),
    "client_scope_id" VARCHAR(36),

    CONSTRAINT "constraint_pcm" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protocol_mapper_config" (
    "protocol_mapper_id" VARCHAR(36) NOT NULL,
    "value" TEXT,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_pmconfig" PRIMARY KEY ("protocol_mapper_id","name")
);

-- CreateTable
CREATE TABLE "realm" (
    "id" VARCHAR(36) NOT NULL,
    "access_code_lifespan" INTEGER,
    "user_action_lifespan" INTEGER,
    "access_token_lifespan" INTEGER,
    "account_theme" VARCHAR(255),
    "admin_theme" VARCHAR(255),
    "email_theme" VARCHAR(255),
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "events_enabled" BOOLEAN NOT NULL DEFAULT false,
    "events_expiration" BIGINT,
    "login_theme" VARCHAR(255),
    "name" VARCHAR(255),
    "not_before" INTEGER,
    "password_policy" VARCHAR(2550),
    "registration_allowed" BOOLEAN NOT NULL DEFAULT false,
    "remember_me" BOOLEAN NOT NULL DEFAULT false,
    "reset_password_allowed" BOOLEAN NOT NULL DEFAULT false,
    "social" BOOLEAN NOT NULL DEFAULT false,
    "ssl_required" VARCHAR(255),
    "sso_idle_timeout" INTEGER,
    "sso_max_lifespan" INTEGER,
    "update_profile_on_soc_login" BOOLEAN NOT NULL DEFAULT false,
    "verify_email" BOOLEAN NOT NULL DEFAULT false,
    "master_admin_client" VARCHAR(36),
    "login_lifespan" INTEGER,
    "internationalization_enabled" BOOLEAN NOT NULL DEFAULT false,
    "default_locale" VARCHAR(255),
    "reg_email_as_username" BOOLEAN NOT NULL DEFAULT false,
    "admin_events_enabled" BOOLEAN NOT NULL DEFAULT false,
    "admin_events_details_enabled" BOOLEAN NOT NULL DEFAULT false,
    "edit_username_allowed" BOOLEAN NOT NULL DEFAULT false,
    "otp_policy_counter" INTEGER DEFAULT 0,
    "otp_policy_window" INTEGER DEFAULT 1,
    "otp_policy_period" INTEGER DEFAULT 30,
    "otp_policy_digits" INTEGER DEFAULT 6,
    "otp_policy_alg" VARCHAR(36) DEFAULT 'HmacSHA1',
    "otp_policy_type" VARCHAR(36) DEFAULT 'totp',
    "browser_flow" VARCHAR(36),
    "registration_flow" VARCHAR(36),
    "direct_grant_flow" VARCHAR(36),
    "reset_credentials_flow" VARCHAR(36),
    "client_auth_flow" VARCHAR(36),
    "offline_session_idle_timeout" INTEGER DEFAULT 0,
    "revoke_refresh_token" BOOLEAN NOT NULL DEFAULT false,
    "access_token_life_implicit" INTEGER DEFAULT 0,
    "login_with_email_allowed" BOOLEAN NOT NULL DEFAULT true,
    "duplicate_emails_allowed" BOOLEAN NOT NULL DEFAULT false,
    "docker_auth_flow" VARCHAR(36),
    "refresh_token_max_reuse" INTEGER DEFAULT 0,
    "allow_user_managed_access" BOOLEAN NOT NULL DEFAULT false,
    "sso_max_lifespan_remember_me" INTEGER NOT NULL DEFAULT 0,
    "sso_idle_timeout_remember_me" INTEGER NOT NULL DEFAULT 0,
    "default_role" VARCHAR(255),

    CONSTRAINT "constraint_4a" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realm_attribute" (
    "name" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,
    "value" TEXT,

    CONSTRAINT "constraint_9" PRIMARY KEY ("name","realm_id")
);

-- CreateTable
CREATE TABLE "realm_default_groups" (
    "realm_id" VARCHAR(36) NOT NULL,
    "group_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constr_realm_default_groups" PRIMARY KEY ("realm_id","group_id")
);

-- CreateTable
CREATE TABLE "realm_enabled_event_types" (
    "realm_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "constr_realm_enabl_event_types" PRIMARY KEY ("realm_id","value")
);

-- CreateTable
CREATE TABLE "realm_events_listeners" (
    "realm_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "constr_realm_events_listeners" PRIMARY KEY ("realm_id","value")
);

-- CreateTable
CREATE TABLE "realm_localizations" (
    "realm_id" VARCHAR(255) NOT NULL,
    "locale" VARCHAR(255) NOT NULL,
    "texts" TEXT NOT NULL,

    CONSTRAINT "realm_localizations_pkey" PRIMARY KEY ("realm_id","locale")
);

-- CreateTable
CREATE TABLE "realm_required_credential" (
    "type" VARCHAR(255) NOT NULL,
    "form_label" VARCHAR(255),
    "input" BOOLEAN NOT NULL DEFAULT false,
    "secret" BOOLEAN NOT NULL DEFAULT false,
    "realm_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_92" PRIMARY KEY ("realm_id","type")
);

-- CreateTable
CREATE TABLE "realm_smtp_config" (
    "realm_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_e" PRIMARY KEY ("realm_id","name")
);

-- CreateTable
CREATE TABLE "realm_supported_locales" (
    "realm_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "constr_realm_supported_locales" PRIMARY KEY ("realm_id","value")
);

-- CreateTable
CREATE TABLE "redirect_uris" (
    "client_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_redirect_uris" PRIMARY KEY ("client_id","value")
);

-- CreateTable
CREATE TABLE "required_action_config" (
    "required_action_id" VARCHAR(36) NOT NULL,
    "value" TEXT,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_req_act_cfg_pk" PRIMARY KEY ("required_action_id","name")
);

-- CreateTable
CREATE TABLE "required_action_provider" (
    "id" VARCHAR(36) NOT NULL,
    "alias" VARCHAR(255),
    "name" VARCHAR(255),
    "realm_id" VARCHAR(36),
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "default_action" BOOLEAN NOT NULL DEFAULT false,
    "provider_id" VARCHAR(255),
    "priority" INTEGER,

    CONSTRAINT "constraint_req_act_prv_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_attribute" (
    "id" VARCHAR(36) NOT NULL DEFAULT 'sybase-needs-something-here',
    "name" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255),
    "resource_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "res_attr_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_policy" (
    "resource_id" VARCHAR(36) NOT NULL,
    "policy_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_farsrpp" PRIMARY KEY ("resource_id","policy_id")
);

-- CreateTable
CREATE TABLE "resource_scope" (
    "resource_id" VARCHAR(36) NOT NULL,
    "scope_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_farsrsp" PRIMARY KEY ("resource_id","scope_id")
);

-- CreateTable
CREATE TABLE "resource_server" (
    "id" VARCHAR(36) NOT NULL,
    "allow_rs_remote_mgmt" BOOLEAN NOT NULL DEFAULT false,
    "policy_enforce_mode" SMALLINT NOT NULL,
    "decision_strategy" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "pk_resource_server" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_server_perm_ticket" (
    "id" VARCHAR(36) NOT NULL,
    "owner" VARCHAR(255) NOT NULL,
    "requester" VARCHAR(255) NOT NULL,
    "created_timestamp" BIGINT NOT NULL,
    "granted_timestamp" BIGINT,
    "resource_id" VARCHAR(36) NOT NULL,
    "scope_id" VARCHAR(36),
    "resource_server_id" VARCHAR(36) NOT NULL,
    "policy_id" VARCHAR(36),

    CONSTRAINT "constraint_fapmt" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_server_policy" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "type" VARCHAR(255) NOT NULL,
    "decision_strategy" SMALLINT,
    "logic" SMALLINT,
    "resource_server_id" VARCHAR(36) NOT NULL,
    "owner" VARCHAR(255),

    CONSTRAINT "constraint_farsrp" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_server_resource" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255),
    "icon_uri" VARCHAR(255),
    "owner" VARCHAR(255) NOT NULL,
    "resource_server_id" VARCHAR(36) NOT NULL,
    "owner_managed_access" BOOLEAN NOT NULL DEFAULT false,
    "display_name" VARCHAR(255),

    CONSTRAINT "constraint_farsr" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_server_scope" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon_uri" VARCHAR(255),
    "resource_server_id" VARCHAR(36) NOT NULL,
    "display_name" VARCHAR(255),

    CONSTRAINT "constraint_farsrs" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_uris" (
    "resource_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_resour_uris_pk" PRIMARY KEY ("resource_id","value")
);

-- CreateTable
CREATE TABLE "revoked_token" (
    "id" VARCHAR(255) NOT NULL,
    "expire" BIGINT NOT NULL,

    CONSTRAINT "constraint_rt" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_attribute" (
    "id" VARCHAR(36) NOT NULL,
    "role_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255),

    CONSTRAINT "constraint_role_attribute_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scope_mapping" (
    "client_id" VARCHAR(36) NOT NULL,
    "role_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_81" PRIMARY KEY ("client_id","role_id")
);

-- CreateTable
CREATE TABLE "scope_policy" (
    "scope_id" VARCHAR(36) NOT NULL,
    "policy_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_farsrsps" PRIMARY KEY ("scope_id","policy_id")
);

-- CreateTable
CREATE TABLE "user_attribute" (
    "name" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255),
    "user_id" VARCHAR(36) NOT NULL,
    "id" VARCHAR(36) NOT NULL DEFAULT 'sybase-needs-something-here',
    "long_value_hash" BYTEA,
    "long_value_hash_lower_case" BYTEA,
    "long_value" TEXT,

    CONSTRAINT "constraint_user_attribute_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_consent" (
    "id" VARCHAR(36) NOT NULL,
    "client_id" VARCHAR(255),
    "user_id" VARCHAR(36) NOT NULL,
    "created_date" BIGINT,
    "last_updated_date" BIGINT,
    "client_storage_provider" VARCHAR(36),
    "external_client_id" VARCHAR(255),

    CONSTRAINT "constraint_grntcsnt_pm" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_consent_client_scope" (
    "user_consent_id" VARCHAR(36) NOT NULL,
    "scope_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_grntcsnt_clsc_pm" PRIMARY KEY ("user_consent_id","scope_id")
);

-- CreateTable
CREATE TABLE "user_entity" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(255),
    "email_constraint" VARCHAR(255),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "federation_link" VARCHAR(255),
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "realm_id" VARCHAR(255),
    "username" VARCHAR(255),
    "created_timestamp" BIGINT,
    "service_account_client_link" VARCHAR(255),
    "not_before" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "constraint_fb" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_federation_config" (
    "user_federation_provider_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_f9" PRIMARY KEY ("user_federation_provider_id","name")
);

-- CreateTable
CREATE TABLE "user_federation_mapper" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "federation_provider_id" VARCHAR(36) NOT NULL,
    "federation_mapper_type" VARCHAR(255) NOT NULL,
    "realm_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_fedmapperpm" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_federation_mapper_config" (
    "user_federation_mapper_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_fedmapper_cfg_pm" PRIMARY KEY ("user_federation_mapper_id","name")
);

-- CreateTable
CREATE TABLE "user_federation_provider" (
    "id" VARCHAR(36) NOT NULL,
    "changed_sync_period" INTEGER,
    "display_name" VARCHAR(255),
    "full_sync_period" INTEGER,
    "last_sync" INTEGER,
    "priority" INTEGER,
    "provider_name" VARCHAR(255),
    "realm_id" VARCHAR(36),

    CONSTRAINT "constraint_5c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_group_membership" (
    "group_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "membership_type" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_user_group" PRIMARY KEY ("group_id","user_id")
);

-- CreateTable
CREATE TABLE "user_required_action" (
    "user_id" VARCHAR(36) NOT NULL,
    "required_action" VARCHAR(255) NOT NULL DEFAULT ' ',

    CONSTRAINT "constraint_required_action" PRIMARY KEY ("required_action","user_id")
);

-- CreateTable
CREATE TABLE "user_role_mapping" (
    "role_id" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "constraint_c" PRIMARY KEY ("role_id","user_id")
);

-- CreateTable
CREATE TABLE "username_login_failure" (
    "realm_id" VARCHAR(36) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "failed_login_not_before" INTEGER,
    "last_failure" BIGINT,
    "last_ip_failure" VARCHAR(255),
    "num_failures" INTEGER,

    CONSTRAINT "CONSTRAINT_17-2" PRIMARY KEY ("realm_id","username")
);

-- CreateTable
CREATE TABLE "web_origins" (
    "client_id" VARCHAR(36) NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "constraint_web_origins" PRIMARY KEY ("client_id","value")
);

-- CreateIndex
CREATE INDEX "idx_admin_event_time" ON "admin_event_entity"("realm_id", "admin_event_time");

-- CreateIndex
CREATE INDEX "idx_assoc_pol_assoc_pol_id" ON "associated_policy"("associated_policy_id");

-- CreateIndex
CREATE INDEX "idx_auth_exec_flow" ON "authentication_execution"("flow_id");

-- CreateIndex
CREATE INDEX "idx_auth_exec_realm_flow" ON "authentication_execution"("realm_id", "flow_id");

-- CreateIndex
CREATE INDEX "idx_auth_flow_realm" ON "authentication_flow"("realm_id");

-- CreateIndex
CREATE INDEX "idx_auth_config_realm" ON "authenticator_config"("realm_id");

-- CreateIndex
CREATE INDEX "idx_client_id" ON "client"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_b71cjlbenv945rb6gcon438at" ON "client"("realm_id", "client_id");

-- CreateIndex
CREATE INDEX "idx_client_init_acc_realm" ON "client_initial_access"("realm_id");

-- CreateIndex
CREATE INDEX "idx_realm_clscope" ON "client_scope"("realm_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_cli_scope" ON "client_scope"("realm_id", "name");

-- CreateIndex
CREATE INDEX "idx_clscope_attrs" ON "client_scope_attributes"("scope_id");

-- CreateIndex
CREATE INDEX "idx_cl_clscope" ON "client_scope_client"("scope_id");

-- CreateIndex
CREATE INDEX "idx_clscope_cl" ON "client_scope_client"("client_id");

-- CreateIndex
CREATE INDEX "idx_clscope_role" ON "client_scope_role_mapping"("scope_id");

-- CreateIndex
CREATE INDEX "idx_role_clscope" ON "client_scope_role_mapping"("role_id");

-- CreateIndex
CREATE INDEX "idx_component_provider_type" ON "component"("provider_type");

-- CreateIndex
CREATE INDEX "idx_component_realm" ON "component"("realm_id");

-- CreateIndex
CREATE INDEX "idx_compo_config_compo" ON "component_config"("component_id");

-- CreateIndex
CREATE INDEX "idx_composite" ON "composite_role"("composite");

-- CreateIndex
CREATE INDEX "idx_composite_child" ON "composite_role"("child_role");

-- CreateIndex
CREATE INDEX "idx_user_credential" ON "credential"("user_id");

-- CreateIndex
CREATE INDEX "idx_defcls_realm" ON "default_client_scope"("realm_id");

-- CreateIndex
CREATE INDEX "idx_defcls_scope" ON "default_client_scope"("scope_id");

-- CreateIndex
CREATE INDEX "idx_event_time" ON "event_entity"("realm_id", "event_time");

-- CreateIndex
CREATE INDEX "fed_user_attr_long_values" ON "fed_user_attribute"("long_value_hash", "name");

-- CreateIndex
CREATE INDEX "fed_user_attr_long_values_lower_case" ON "fed_user_attribute"("long_value_hash_lower_case", "name");

-- CreateIndex
CREATE INDEX "idx_fu_attribute" ON "fed_user_attribute"("user_id", "realm_id", "name");

-- CreateIndex
CREATE INDEX "idx_fu_cnsnt_ext" ON "fed_user_consent"("user_id", "client_storage_provider", "external_client_id");

-- CreateIndex
CREATE INDEX "idx_fu_consent" ON "fed_user_consent"("user_id", "client_id");

-- CreateIndex
CREATE INDEX "idx_fu_consent_ru" ON "fed_user_consent"("realm_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_fu_credential" ON "fed_user_credential"("user_id", "type");

-- CreateIndex
CREATE INDEX "idx_fu_credential_ru" ON "fed_user_credential"("realm_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_fu_group_membership" ON "fed_user_group_membership"("user_id", "group_id");

-- CreateIndex
CREATE INDEX "idx_fu_group_membership_ru" ON "fed_user_group_membership"("realm_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_fu_required_action" ON "fed_user_required_action"("user_id", "required_action");

-- CreateIndex
CREATE INDEX "idx_fu_required_action_ru" ON "fed_user_required_action"("realm_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_fu_role_mapping" ON "fed_user_role_mapping"("user_id", "role_id");

-- CreateIndex
CREATE INDEX "idx_fu_role_mapping_ru" ON "fed_user_role_mapping"("realm_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_fedidentity_feduser" ON "federated_identity"("federated_user_id");

-- CreateIndex
CREATE INDEX "idx_fedidentity_user" ON "federated_identity"("user_id");

-- CreateIndex
CREATE INDEX "idx_group_attr_group" ON "group_attribute"("group_id");

-- CreateIndex
CREATE INDEX "idx_group_role_mapp_group" ON "group_role_mapping"("group_id");

-- CreateIndex
CREATE INDEX "idx_ident_prov_realm" ON "identity_provider"("realm_id");

-- CreateIndex
CREATE INDEX "idx_idp_for_login" ON "identity_provider"("realm_id", "enabled", "link_only", "hide_on_login", "organization_id");

-- CreateIndex
CREATE INDEX "idx_idp_realm_org" ON "identity_provider"("realm_id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_2daelwnibji49avxsrtuf6xj33" ON "identity_provider"("provider_alias", "realm_id");

-- CreateIndex
CREATE INDEX "idx_id_prov_mapp_realm" ON "identity_provider_mapper"("realm_id");

-- CreateIndex
CREATE UNIQUE INDEX "sibling_names" ON "keycloak_group"("realm_id", "parent_group", "name");

-- CreateIndex
CREATE INDEX "idx_keycloak_role_client" ON "keycloak_role"("client");

-- CreateIndex
CREATE INDEX "idx_keycloak_role_realm" ON "keycloak_role"("realm");

-- CreateIndex
CREATE UNIQUE INDEX "UK_J3RWUVD56ONTGSUHOGM184WW2-2" ON "keycloak_role"("name", "client_realm_constraint");

-- CreateIndex
CREATE INDEX "idx_update_time" ON "migration_model"("update_time");

-- CreateIndex
CREATE INDEX "idx_offline_uss_by_broker_session_id" ON "offline_user_session"("broker_session_id", "realm_id");

-- CreateIndex
CREATE INDEX "idx_offline_uss_by_last_session_refresh" ON "offline_user_session"("realm_id", "offline_flag", "last_session_refresh");

-- CreateIndex
CREATE INDEX "idx_offline_uss_by_user" ON "offline_user_session"("user_id", "realm_id", "offline_flag");

-- CreateIndex
CREATE UNIQUE INDEX "uk_org_group" ON "org"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_org_alias" ON "org"("realm_id", "alias");

-- CreateIndex
CREATE UNIQUE INDEX "uk_org_name" ON "org"("realm_id", "name");

-- CreateIndex
CREATE INDEX "idx_org_domain_org_id" ON "org_domain"("org_id");

-- CreateIndex
CREATE INDEX "idx_clscope_protmap" ON "protocol_mapper"("client_scope_id");

-- CreateIndex
CREATE INDEX "idx_protocol_mapper_client" ON "protocol_mapper"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_orvsdmla56612eaefiq6wl5oi" ON "realm"("name");

-- CreateIndex
CREATE INDEX "idx_realm_master_adm_cli" ON "realm"("master_admin_client");

-- CreateIndex
CREATE INDEX "idx_realm_attr_realm" ON "realm_attribute"("realm_id");

-- CreateIndex
CREATE UNIQUE INDEX "con_group_id_def_groups" ON "realm_default_groups"("group_id");

-- CreateIndex
CREATE INDEX "idx_realm_def_grp_realm" ON "realm_default_groups"("realm_id");

-- CreateIndex
CREATE INDEX "idx_realm_evt_types_realm" ON "realm_enabled_event_types"("realm_id");

-- CreateIndex
CREATE INDEX "idx_realm_evt_list_realm" ON "realm_events_listeners"("realm_id");

-- CreateIndex
CREATE INDEX "idx_realm_supp_local_realm" ON "realm_supported_locales"("realm_id");

-- CreateIndex
CREATE INDEX "idx_redir_uri_client" ON "redirect_uris"("client_id");

-- CreateIndex
CREATE INDEX "idx_req_act_prov_realm" ON "required_action_provider"("realm_id");

-- CreateIndex
CREATE INDEX "idx_res_policy_policy" ON "resource_policy"("policy_id");

-- CreateIndex
CREATE INDEX "idx_res_scope_scope" ON "resource_scope"("scope_id");

-- CreateIndex
CREATE INDEX "idx_perm_ticket_owner" ON "resource_server_perm_ticket"("owner");

-- CreateIndex
CREATE INDEX "idx_perm_ticket_requester" ON "resource_server_perm_ticket"("requester");

-- CreateIndex
CREATE UNIQUE INDEX "uk_frsr6t700s9v50bu18ws5pmt" ON "resource_server_perm_ticket"("owner", "requester", "resource_server_id", "resource_id", "scope_id");

-- CreateIndex
CREATE INDEX "idx_res_serv_pol_res_serv" ON "resource_server_policy"("resource_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_frsrpt700s9v50bu18ws5ha6" ON "resource_server_policy"("name", "resource_server_id");

-- CreateIndex
CREATE INDEX "idx_res_srv_res_res_srv" ON "resource_server_resource"("resource_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_frsr6t700s9v50bu18ws5ha6" ON "resource_server_resource"("name", "owner", "resource_server_id");

-- CreateIndex
CREATE INDEX "idx_res_srv_scope_res_srv" ON "resource_server_scope"("resource_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_frsrst700s9v50bu18ws5ha6" ON "resource_server_scope"("name", "resource_server_id");

-- CreateIndex
CREATE INDEX "idx_rev_token_on_expire" ON "revoked_token"("expire");

-- CreateIndex
CREATE INDEX "idx_role_attribute" ON "role_attribute"("role_id");

-- CreateIndex
CREATE INDEX "idx_scope_mapping_role" ON "scope_mapping"("role_id");

-- CreateIndex
CREATE INDEX "idx_scope_policy_policy" ON "scope_policy"("policy_id");

-- CreateIndex
CREATE INDEX "idx_user_attribute" ON "user_attribute"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_attribute_name" ON "user_attribute"("name", "value");

-- CreateIndex
CREATE INDEX "user_attr_long_values" ON "user_attribute"("long_value_hash", "name");

-- CreateIndex
CREATE INDEX "user_attr_long_values_lower_case" ON "user_attribute"("long_value_hash_lower_case", "name");

-- CreateIndex
CREATE INDEX "idx_user_consent" ON "user_consent"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_external_consent" ON "user_consent"("client_storage_provider", "external_client_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_local_consent" ON "user_consent"("client_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_usconsent_clscope" ON "user_consent_client_scope"("user_consent_id");

-- CreateIndex
CREATE INDEX "idx_usconsent_scope_id" ON "user_consent_client_scope"("scope_id");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "user_entity"("email");

-- CreateIndex
CREATE INDEX "idx_user_service_account" ON "user_entity"("realm_id", "service_account_client_link");

-- CreateIndex
CREATE UNIQUE INDEX "uk_dykn684sl8up1crfei6eckhd7" ON "user_entity"("realm_id", "email_constraint");

-- CreateIndex
CREATE UNIQUE INDEX "uk_ru8tt6t700s9v50bu18ws5ha6" ON "user_entity"("realm_id", "username");

-- CreateIndex
CREATE INDEX "idx_usr_fed_map_fed_prv" ON "user_federation_mapper"("federation_provider_id");

-- CreateIndex
CREATE INDEX "idx_usr_fed_map_realm" ON "user_federation_mapper"("realm_id");

-- CreateIndex
CREATE INDEX "idx_usr_fed_prv_realm" ON "user_federation_provider"("realm_id");

-- CreateIndex
CREATE INDEX "idx_user_group_mapping" ON "user_group_membership"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_reqactions" ON "user_required_action"("user_id");

-- CreateIndex
CREATE INDEX "idx_user_role_mapping" ON "user_role_mapping"("user_id");

-- CreateIndex
CREATE INDEX "idx_web_orig_client" ON "web_origins"("client_id");

-- AddForeignKey
ALTER TABLE "associated_policy" ADD CONSTRAINT "fk_frsr5s213xcx4wnkog82ssrfy" FOREIGN KEY ("associated_policy_id") REFERENCES "resource_server_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "associated_policy" ADD CONSTRAINT "fk_frsrpas14xcx4wnkog82ssrfy" FOREIGN KEY ("policy_id") REFERENCES "resource_server_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authentication_execution" ADD CONSTRAINT "fk_auth_exec_flow" FOREIGN KEY ("flow_id") REFERENCES "authentication_flow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authentication_execution" ADD CONSTRAINT "fk_auth_exec_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authentication_flow" ADD CONSTRAINT "fk_auth_flow_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authenticator_config" ADD CONSTRAINT "fk_auth_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_attributes" ADD CONSTRAINT "fk3c47c64beacca966" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_initial_access" ADD CONSTRAINT "fk_client_init_acc_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_node_registrations" ADD CONSTRAINT "fk4129723ba992f594" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_scope_attributes" ADD CONSTRAINT "fk_cl_scope_attr_scope" FOREIGN KEY ("scope_id") REFERENCES "client_scope"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_scope_role_mapping" ADD CONSTRAINT "fk_cl_scope_rm_scope" FOREIGN KEY ("scope_id") REFERENCES "client_scope"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "component" ADD CONSTRAINT "fk_component_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "component_config" ADD CONSTRAINT "fk_component_config" FOREIGN KEY ("component_id") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "composite_role" ADD CONSTRAINT "fk_a63wvekftu8jo1pnj81e7mce2" FOREIGN KEY ("composite") REFERENCES "keycloak_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "composite_role" ADD CONSTRAINT "fk_gr7thllb9lu8q4vqa4524jjy8" FOREIGN KEY ("child_role") REFERENCES "keycloak_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credential" ADD CONSTRAINT "fk_pfyr0glasqyl0dei3kl69r6v0" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "default_client_scope" ADD CONSTRAINT "fk_r_def_cli_scope_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "federated_identity" ADD CONSTRAINT "fk404288b92ef007a6" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group_attribute" ADD CONSTRAINT "fk_group_attribute_group" FOREIGN KEY ("group_id") REFERENCES "keycloak_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group_role_mapping" ADD CONSTRAINT "fk_group_role_group" FOREIGN KEY ("group_id") REFERENCES "keycloak_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "identity_provider" ADD CONSTRAINT "fk2b4ebc52ae5c3b34" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "identity_provider_config" ADD CONSTRAINT "fkdc4897cf864c4e43" FOREIGN KEY ("identity_provider_id") REFERENCES "identity_provider"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "identity_provider_mapper" ADD CONSTRAINT "fk_idpm_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "idp_mapper_config" ADD CONSTRAINT "fk_idpmconfig" FOREIGN KEY ("idp_mapper_id") REFERENCES "identity_provider_mapper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "keycloak_role" ADD CONSTRAINT "fk_6vyqfe4cn4wlq8r6kt5vdsj5c" FOREIGN KEY ("realm") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "policy_config" ADD CONSTRAINT "fkdc34197cf864c4e43" FOREIGN KEY ("policy_id") REFERENCES "resource_server_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "protocol_mapper" ADD CONSTRAINT "fk_cli_scope_mapper" FOREIGN KEY ("client_scope_id") REFERENCES "client_scope"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "protocol_mapper" ADD CONSTRAINT "fk_pcm_realm" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "protocol_mapper_config" ADD CONSTRAINT "fk_pmconfig" FOREIGN KEY ("protocol_mapper_id") REFERENCES "protocol_mapper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realm_attribute" ADD CONSTRAINT "fk_8shxd6l3e9atqukacxgpffptw" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realm_default_groups" ADD CONSTRAINT "fk_def_groups_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realm_enabled_event_types" ADD CONSTRAINT "fk_h846o4h0w8epx5nwedrf5y69j" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realm_events_listeners" ADD CONSTRAINT "fk_h846o4h0w8epx5nxev9f5y69j" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realm_required_credential" ADD CONSTRAINT "fk_5hg65lybevavkqfki3kponh9v" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realm_smtp_config" ADD CONSTRAINT "fk_70ej8xdxgxd0b9hh6180irr0o" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realm_supported_locales" ADD CONSTRAINT "fk_supported_locales_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "redirect_uris" ADD CONSTRAINT "fk_1burs8pb4ouj97h5wuppahv9f" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "required_action_provider" ADD CONSTRAINT "fk_req_act_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_attribute" ADD CONSTRAINT "fk_5hrm2vlf9ql5fu022kqepovbr" FOREIGN KEY ("resource_id") REFERENCES "resource_server_resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_policy" ADD CONSTRAINT "fk_frsrpos53xcx4wnkog82ssrfy" FOREIGN KEY ("resource_id") REFERENCES "resource_server_resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_policy" ADD CONSTRAINT "fk_frsrpp213xcx4wnkog82ssrfy" FOREIGN KEY ("policy_id") REFERENCES "resource_server_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_scope" ADD CONSTRAINT "fk_frsrpos13xcx4wnkog82ssrfy" FOREIGN KEY ("resource_id") REFERENCES "resource_server_resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_scope" ADD CONSTRAINT "fk_frsrps213xcx4wnkog82ssrfy" FOREIGN KEY ("scope_id") REFERENCES "resource_server_scope"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_server_perm_ticket" ADD CONSTRAINT "fk_frsrho213xcx4wnkog82sspmt" FOREIGN KEY ("resource_server_id") REFERENCES "resource_server"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_server_perm_ticket" ADD CONSTRAINT "fk_frsrho213xcx4wnkog83sspmt" FOREIGN KEY ("resource_id") REFERENCES "resource_server_resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_server_perm_ticket" ADD CONSTRAINT "fk_frsrho213xcx4wnkog84sspmt" FOREIGN KEY ("scope_id") REFERENCES "resource_server_scope"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_server_perm_ticket" ADD CONSTRAINT "fk_frsrpo2128cx4wnkog82ssrfy" FOREIGN KEY ("policy_id") REFERENCES "resource_server_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_server_policy" ADD CONSTRAINT "fk_frsrpo213xcx4wnkog82ssrfy" FOREIGN KEY ("resource_server_id") REFERENCES "resource_server"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_server_resource" ADD CONSTRAINT "fk_frsrho213xcx4wnkog82ssrfy" FOREIGN KEY ("resource_server_id") REFERENCES "resource_server"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_server_scope" ADD CONSTRAINT "fk_frsrso213xcx4wnkog82ssrfy" FOREIGN KEY ("resource_server_id") REFERENCES "resource_server"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resource_uris" ADD CONSTRAINT "fk_resource_server_uris" FOREIGN KEY ("resource_id") REFERENCES "resource_server_resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_attribute" ADD CONSTRAINT "fk_role_attribute_id" FOREIGN KEY ("role_id") REFERENCES "keycloak_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scope_mapping" ADD CONSTRAINT "fk_ouse064plmlr732lxjcn1q5f1" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scope_policy" ADD CONSTRAINT "fk_frsrasp13xcx4wnkog82ssrfy" FOREIGN KEY ("policy_id") REFERENCES "resource_server_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scope_policy" ADD CONSTRAINT "fk_frsrpass3xcx4wnkog82ssrfy" FOREIGN KEY ("scope_id") REFERENCES "resource_server_scope"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_attribute" ADD CONSTRAINT "fk_5hrm2vlf9ql5fu043kqepovbr" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_consent" ADD CONSTRAINT "fk_grntcsnt_user" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_consent_client_scope" ADD CONSTRAINT "fk_grntcsnt_clsc_usc" FOREIGN KEY ("user_consent_id") REFERENCES "user_consent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_federation_config" ADD CONSTRAINT "fk_t13hpu1j94r2ebpekr39x5eu5" FOREIGN KEY ("user_federation_provider_id") REFERENCES "user_federation_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_federation_mapper" ADD CONSTRAINT "fk_fedmapperpm_fedprv" FOREIGN KEY ("federation_provider_id") REFERENCES "user_federation_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_federation_mapper" ADD CONSTRAINT "fk_fedmapperpm_realm" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_federation_mapper_config" ADD CONSTRAINT "fk_fedmapper_cfg" FOREIGN KEY ("user_federation_mapper_id") REFERENCES "user_federation_mapper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_federation_provider" ADD CONSTRAINT "fk_1fj32f6ptolw2qy60cd8n01e8" FOREIGN KEY ("realm_id") REFERENCES "realm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_group_membership" ADD CONSTRAINT "fk_user_group_user" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_required_action" ADD CONSTRAINT "fk_6qj3w1jw9cvafhe19bwsiuvmd" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role_mapping" ADD CONSTRAINT "fk_c4fqv34p1mbylloxang7b1q3l" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "web_origins" ADD CONSTRAINT "fk_lojpho213xcx4wnkog82ssrfy" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
