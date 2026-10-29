-- mini-boot BPM business schema reconstructed from public MIT-licensed entities and mappers.
-- Source: YunaiV/ruoyi-vue-pro master-jdk17 @ 971c5a651511e244187cc6b3b0eadf9d9f29c573
-- MySQL 8. Select the mini-boot database first. Existing tables and business data are preserved.
-- Flowable ACT_* / FLW_* engine tables are managed by Flowable database-schema-update.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `bpm_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(64) DEFAULT NULL,
  `description` longtext,
  `status` int DEFAULT NULL,
  `sort` int DEFAULT NULL,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_code` (`tenant_id`, `code`, `deleted`),
  KEY `idx_status` (`tenant_id`, `status`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='BPM 流程分类 DO';

CREATE TABLE IF NOT EXISTS `bpm_form` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `conf` longtext,
  `fields` text,
  `remark` varchar(1024) DEFAULT NULL,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`tenant_id`, `status`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='BPM 工作流的表单定义';

CREATE TABLE IF NOT EXISTS `bpm_process_definition_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `process_definition_id` varchar(64) DEFAULT NULL,
  `model_id` varchar(64) DEFAULT NULL,
  `model_type` int DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `description` longtext,
  `form_type` int DEFAULT NULL,
  `form_id` bigint DEFAULT NULL,
  `form_conf` longtext,
  `form_fields` text,
  `form_custom_create_path` varchar(255) DEFAULT NULL,
  `form_custom_view_path` varchar(255) DEFAULT NULL,
  `simple_model` longtext,
  `visible` bit(1) NOT NULL DEFAULT b'0',
  `sort` bigint DEFAULT NULL,
  `start_user_ids` text,
  `start_dept_ids` text,
  `manager_user_ids` text,
  `allow_cancel_running_process` bit(1) NOT NULL DEFAULT b'0',
  `allow_withdraw_task` bit(1) NOT NULL DEFAULT b'0',
  `process_id_rule` longtext,
  `auto_approval_type` int DEFAULT NULL,
  `title_setting` longtext,
  `summary_setting` longtext,
  `process_before_trigger_setting` longtext,
  `process_after_trigger_setting` longtext,
  `task_before_trigger_setting` longtext,
  `task_after_trigger_setting` longtext,
  `print_template_setting` longtext,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_process_definition_id` (`tenant_id`, `process_definition_id`, `deleted`),
  KEY `idx_model_id` (`tenant_id`, `model_id`, `deleted`),
  KEY `idx_form_id` (`tenant_id`, `form_id`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='BPM 流程定义的拓信息';

CREATE TABLE IF NOT EXISTS `bpm_process_expression` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `expression` varchar(255) DEFAULT NULL,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`tenant_id`, `status`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='BPM 流程表达式 DO';

CREATE TABLE IF NOT EXISTS `bpm_process_listener` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `value_type` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`tenant_id`, `status`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='BPM 流程监听器 DO';

CREATE TABLE IF NOT EXISTS `bpm_user_group` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `status` int DEFAULT NULL,
  `user_ids` text,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`tenant_id`, `status`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='BPM 用户组';

CREATE TABLE IF NOT EXISTS `bpm_oa_leave` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `type` int DEFAULT NULL,
  `reason` varchar(1024) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `day` bigint DEFAULT NULL,
  `status` int DEFAULT NULL,
  `process_instance_id` varchar(64) DEFAULT NULL,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`tenant_id`, `user_id`, `deleted`),
  KEY `idx_start_time` (`tenant_id`, `start_time`, `deleted`),
  KEY `idx_end_time` (`tenant_id`, `end_time`, `deleted`),
  KEY `idx_status` (`tenant_id`, `status`, `deleted`),
  KEY `idx_process_instance_id` (`tenant_id`, `process_instance_id`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='OA 请假申请 DO';

CREATE TABLE IF NOT EXISTS `bpm_process_instance_copy` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_user_id` bigint DEFAULT NULL,
  `process_instance_name` varchar(255) DEFAULT NULL,
  `process_instance_id` varchar(64) DEFAULT NULL,
  `process_definition_id` varchar(64) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `activity_id` varchar(64) DEFAULT NULL,
  `activity_name` varchar(255) DEFAULT NULL,
  `task_id` varchar(64) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `reason` varchar(1024) DEFAULT NULL,
  `creator` varchar(64) DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updater` varchar(64) DEFAULT '',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_start_user_id` (`tenant_id`, `start_user_id`, `deleted`),
  KEY `idx_process_instance_id` (`tenant_id`, `process_instance_id`, `deleted`),
  KEY `idx_process_definition_id` (`tenant_id`, `process_definition_id`, `deleted`),
  KEY `idx_activity_id` (`tenant_id`, `activity_id`, `deleted`),
  KEY `idx_task_id` (`tenant_id`, `task_id`, `deleted`),
  KEY `idx_user_id` (`tenant_id`, `user_id`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='流程抄送 DO';

-- Permission for the expression export endpoint used by the Vben administration UI.
INSERT INTO `system_menu`
  (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`,
   `status`, `visible`, `keep_alive`, `always_show`, `creator`, `updater`)
SELECT '流程表达式导出', 'bpm:process-expression:export', 3, 5, query_button.parent_id,
       '', '', '', '', 0, b'1', b'1', b'1', '1', '1'
FROM `system_menu` query_button
WHERE query_button.permission = 'bpm:process-expression:query' AND query_button.deleted = b'0'
  AND NOT EXISTS (SELECT 1 FROM `system_menu` existing
                  WHERE existing.permission = 'bpm:process-expression:export' AND existing.deleted = b'0')
LIMIT 1;
