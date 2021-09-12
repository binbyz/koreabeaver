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
  PRIMARY KEY (`id`),
  KEY `unq_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `molit_raw_apt_trade` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '고유 유니크 아이디',
  `serial_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '일련번호',
  `apartment_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '아파트명',
  `build_year` int unsigned DEFAULT NULL COMMENT '건축년도',
  `deal_amount` int unsigned DEFAULT NULL COMMENT '거래금액',
  `deal_year` int unsigned DEFAULT NULL COMMENT '계약년도',
  `deal_month` int unsigned DEFAULT NULL COMMENT '계약월',
  `deal_day` int unsigned DEFAULT NULL COMMENT '계약일',
  `floor` tinyint DEFAULT NULL COMMENT '층수',
  `road_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명',
  `road_name_bonbun` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명건물본번코드',
  `road_name_bubun` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명건물부번호코드',
  `road_name_sigungu_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명시군구코드',
  `road_name_seq` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명일련번호코드',
  `road_name_basement_code` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명지상지하코드',
  `road_name_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명코드',
  `land_code` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '법정동지번코드',
  `dong` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '법정동',
  `bonbun` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '법정동돈번코드',
  `bubun` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '벙정동부번코드',
  `jibun` int unsigned DEFAULT NULL COMMENT '지번',
  `sigungu_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '대상물건의 시군구코드',
  `eubmyundong_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '대상물건의 읍면동코드',
  `area_for_exclusive_use` float DEFAULT NULL COMMENT '전용면적 (제곱미터)',
  `regional_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '지역코드',
  `cancel_deal_type` int unsigned DEFAULT '0' COMMENT '해제여부',
  `cancel_deal_day` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '해제사유발생일',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uq_uuid` (`uuid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
