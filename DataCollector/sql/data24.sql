CREATE TABLE `data24_raw_mdcin` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ADM_DISPS_SEQ` bigint unsigned NOT NULL COMMENT '행정처분일련번호',
  `ENTP_NAME` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '업소명',
  `ADDR` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '업소소재지',
  `ENTP_NO` bigint unsigned NOT NULL COMMENT '업허가번호',
  `ITEM_NAME` text NOT NULL COMMENT '제품명',
  `BEF_APPLY_LAW` text COMMENT '위반법명',
  `EXPOSE_CONT` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '위반내용',
  `ADM_DISPS_NAME` text COMMENT '행정처분명',
  `LAST_SETTLE_DATE` date NOT NULL COMMENT '행정처분일자 (최종확정일자)',
  `DISPS_TERM_DATE` varchar(300) DEFAULT NULL COMMENT '행정처분기간',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_ADS` (`ADM_DISPS_SEQ`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `collector_history` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint unsigned NOT NULL COMMENT '크롤러 타입',
  `extra_data` json DEFAULT NULL COMMENT '각 크롤러의 중요 마지막 데이터',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
