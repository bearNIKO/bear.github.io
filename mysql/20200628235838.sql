/*
MySQL Backup
Database: bearbookcan
Backup Time: 2020-06-28 23:58:42
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `bearbookcan`.`admin`;
DROP TABLE IF EXISTS `bearbookcan`.`city`;
DROP TABLE IF EXISTS `bearbookcan`.`feedback`;
DROP TABLE IF EXISTS `bearbookcan`.`goods`;
DROP TABLE IF EXISTS `bearbookcan`.`goods_img`;
DROP TABLE IF EXISTS `bearbookcan`.`orders`;
DROP TABLE IF EXISTS `bearbookcan`.`province`;
DROP TABLE IF EXISTS `bearbookcan`.`user_table`;
CREATE TABLE `admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE `city` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `proID` int(11) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
CREATE TABLE `feedback` (
  `type` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `information` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `goods` (
  `goodsID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `swiper` varchar(255) DEFAULT NULL,
  `ju` varchar(255) DEFAULT NULL,
  `juan` varchar(255) DEFAULT NULL,
  `oldsell` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `oldprice` decimal(10,2) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `limit` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`goodsID`)
) ENGINE=InnoDB AUTO_INCREMENT=223460 DEFAULT CHARSET=utf8;
CREATE TABLE `goods_img` (
  `kind` int(255) DEFAULT NULL,
  `swiper` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `orders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `descs` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `goodsID` int(11) DEFAULT NULL,
  `allCount` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `uemail` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `goodsType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12345682 DEFAULT CHARSET=utf8;
CREATE TABLE `province` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
CREATE TABLE `user_table` (
  ` ID` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `province` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `qq` int(20) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `head` varchar(255) DEFAULT NULL,
  `session_key` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (` ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
BEGIN;
LOCK TABLES `bearbookcan`.`admin` WRITE;
DELETE FROM `bearbookcan`.`admin`;
INSERT INTO `bearbookcan`.`admin` (`ID`,`user`,`name`,`password`,`email`) VALUES (1, 'root', 'bear', '123456', NULL);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bearbookcan`.`city` WRITE;
DELETE FROM `bearbookcan`.`city`;
INSERT INTO `bearbookcan`.`city` (`ID`,`name`,`proID`) VALUES (1, '北京市', 1),(1, '天津市', 2),(1, '上海市', 3),(1, '重庆市', 4),(1, '石家庄市', 5),(2, '唐山市', 5),(3, '秦皇岛市', 5),(4, '邯郸市', 5),(5, '邢台市', 5),(6, '保定市', 5),(7, '张家口市', 5),(8, '承德市', 5),(9, '沧州市', 5),(10, '廊坊市', 5),(11, '衡水市', 5),(1, '太原市', 6),(2, '大同市', 6),(3, '阳泉市', 6),(4, '长治市', 6),(5, '晋城市', 6),(6, '朔州市', 6),(7, '晋中市', 6),(8, '运城市', 6),(9, '忻州市', 6),(10, '临汾市', 6),(11, '吕梁市', 6),(1, '台北市', 7),(2, '高雄市', 7),(3, '基隆市', 7),(4, '台中市', 7),(5, '台南市', 7),(6, '新竹市', 7),(7, '嘉义市', 7),(8, '台北县', 7),(9, '宜兰县', 7),(10, '桃园县', 7),(11, '新竹县', 7),(12, '苗栗县', 7),(13, '台中县', 7),(14, '彰化县', 7),(15, '南投县', 7),(16, '云林县', 7),(17, '嘉义县', 7),(18, '台南县', 7),(19, '高雄县', 7),(20, '屏东县', 7),(21, '澎湖县', 7),(22, '台东县', 7),(23, '花莲县', 7),(1, '沈阳市', 8),(2, '大连市', 8),(3, '鞍山市', 8),(4, '抚顺市', 8),(5, '本溪市', 8),(6, '丹东市', 8),(7, '锦州市', 8),(8, '营口市', 8),(9, '阜新市', 8),(10, '辽阳市', 8),(11, '盘锦市', 8),(12, '铁岭市', 8),(13, '朝阳市', 8),(14, '葫芦岛市', 8),(1, '长春市', 9),(2, '吉林市', 9),(3, '四平市', 9),(4, '辽源市', 9),(5, '通化市', 9),(6, '白山市', 9),(7, '松原市', 9),(8, '白城市', 9),(9, '延边朝鲜族自治州', 9),(1, '哈尔滨市', 10),(2, '齐齐哈尔市', 10),(3, '鹤 岗 市', 10),(4, '双鸭山市', 10),(5, '鸡 西 市', 10),(6, '大 庆 市', 10),(7, '伊 春 市', 10),(8, '牡丹江市', 10),(9, '佳木斯市', 10),(10, '七台河市', 10),(11, '黑 河 市', 10),(12, '绥 化 市', 10),(13, '大兴安岭地区', 10),(1, '南京市', 11),(2, '无锡市', 11),(3, '徐州市', 11),(4, '常州市', 11),(5, '苏州市', 11),(6, '南通市', 11),(7, '连云港市', 11),(8, '淮安市', 11),(9, '盐城市', 11),(10, '扬州市', 11),(11, '镇江市', 11),(12, '泰州市', 11),(13, '宿迁市', 11),(1, '杭州市', 12),(2, '宁波市', 12),(3, '温州市', 12),(4, '嘉兴市', 12),(5, '湖州市', 12),(6, '绍兴市', 12),(7, '金华市', 12),(8, '衢州市', 12),(9, '舟山市', 12),(10, '台州市', 12),(11, '丽水市', 12),(1, '合肥市', 13),(2, '芜湖市', 13),(3, '蚌埠市', 13),(4, '淮南市', 13),(5, '马鞍山市', 13),(6, '淮北市', 13),(7, '铜陵市', 13),(8, '安庆市', 13),(9, '黄山市', 13),(10, '滁州市', 13),(11, '阜阳市', 13),(12, '宿州市', 13),(13, '巢湖市', 13),(14, '六安市', 13),(15, '亳州市', 13),(16, '池州市', 13),(17, '宣城市', 13),(1, '福州市', 14),(2, '厦门市', 14),(3, '莆田市', 14),(4, '三明市', 14),(5, '泉州市', 14),(6, '漳州市', 14),(7, '南平市', 14),(8, '龙岩市', 14),(9, '宁德市', 14),(1, '南昌市', 15),(2, '景德镇市', 15),(3, '萍乡市', 15),(4, '九江市', 15),(5, '新余市', 15),(6, '鹰潭市', 15),(7, '赣州市', 15),(8, '吉安市', 15),(9, '宜春市', 15),(10, '抚州市', 15),(11, '上饶市', 15),(1, '济南市', 16),(2, '青岛市', 16),(3, '淄博市', 16),(4, '枣庄市', 16),(5, '东营市', 16),(6, '烟台市', 16),(7, '潍坊市', 16),(8, '济宁市', 16),(9, '泰安市', 16),(10, '威海市', 16),(11, '日照市', 16),(12, '莱芜市', 16),(13, '临沂市', 16),(14, '德州市', 16),(15, '聊城市', 16),(16, '滨州市', 16),(17, '菏泽市', 16),(1, '郑州市', 17),(2, '开封市', 17),(3, '洛阳市', 17),(4, '平顶山市', 17),(5, '安阳市', 17),(6, '鹤壁市', 17),(7, '新乡市', 17),(8, '焦作市', 17),(9, '濮阳市', 17),(10, '许昌市', 17),(11, '漯河市', 17),(12, '三门峡市', 17),(13, '南阳市', 17),(14, '商丘市', 17),(15, '信阳市', 17),(16, '周口市', 17),(17, '驻马店市', 17),(18, '济源市', 17),(1, '武汉市', 18),(2, '黄石市', 18),(3, '十堰市', 18),(4, '荆州市', 18),(5, '宜昌市', 18),(6, '襄樊市', 18),(7, '鄂州市', 18),(8, '荆门市', 18),(9, '孝感市', 18),(10, '黄冈市', 18),(11, '咸宁市', 18),(12, '随州市', 18),(13, '仙桃市', 18),(14, '天门市', 18),(15, '潜江市', 18),(16, '神农架林区', 18),(17, '恩施土家族苗族自治州', 18),(1, '长沙市', 19),(2, '株洲市', 19),(3, '湘潭市', 19),(4, '衡阳市', 19),(5, '邵阳市', 19),(6, '岳阳市', 19),(7, '常德市', 19),(8, '张家界市', 19),(9, '益阳市', 19),(10, '郴州市', 19),(11, '永州市', 19),(12, '怀化市', 19),(13, '娄底市', 19),(14, '湘西土家族苗族自治州', 19),(1, '广州市', 20),(2, '深圳市', 20),(3, '珠海市', 20),(4, '汕头市', 20),(5, '韶关市', 20),(6, '佛山市', 20),(7, '江门市', 20),(8, '湛江市', 20),(9, '茂名市', 20),(10, '肇庆市', 20),(11, '惠州市', 20),(12, '梅州市', 20),(13, '汕尾市', 20),(14, '河源市', 20),(15, '阳江市', 20),(16, '清远市', 20),(17, '东莞市', 20),(18, '中山市', 20),(19, '潮州市', 20),(20, '揭阳市', 20),(21, '云浮市', 20),(1, '兰州市', 21),(2, '金昌市', 21),(3, '白银市', 21),(4, '天水市', 21),(5, '嘉峪关市', 21),(6, '武威市', 21),(7, '张掖市', 21),(8, '平凉市', 21),(9, '酒泉市', 21),(10, '庆阳市', 21),(11, '定西市', 21),(12, '陇南市', 21),(13, '临夏回族自治州', 21),(14, '甘南藏族自治州', 21),(1, '成都市', 22),(2, '自贡市', 22),(3, '攀枝花市', 22),(4, '泸州市', 22),(5, '德阳市', 22),(6, '绵阳市', 22),(7, '广元市', 22),(8, '遂宁市', 22),(9, '内江市', 22),(10, '乐山市', 22),(11, '南充市', 22),(12, '眉山市', 22),(13, '宜宾市', 22),(14, '广安市', 22),(15, '达州市', 22),(16, '雅安市', 22),(17, '巴中市', 22),(18, '资阳市', 22),(19, '阿坝藏族羌族自治州', 22),(20, '甘孜藏族自治州', 22),(21, '凉山彝族自治州', 22),(1, '贵阳市', 24),(2, '六盘水市', 24),(3, '遵义市', 24),(4, '安顺市', 24),(5, '铜仁地区', 24),(6, '毕节地区', 24),(7, '黔西南布依族苗族自治州', 24),(8, '黔东南苗族侗族自治州', 24),(9, '黔南布依族苗族自治州', 24),(1, '海口市', 25),(2, '三亚市', 25),(3, '五指山市', 25),(4, '琼海市', 25),(5, '儋州市', 25),(6, '文昌市', 25),(7, '万宁市', 25),(8, '东方市', 25),(9, '澄迈县', 25),(10, '定安县', 25),(11, '屯昌县', 25),(12, '临高县', 25),(13, '白沙黎族自治县', 25),(14, '昌江黎族自治县', 25),(15, '乐东黎族自治县', 25),(16, '陵水黎族自治县', 25),(17, '保亭黎族苗族自治县', 25),(18, '琼中黎族苗族自治县', 25),(1, '昆明市', 26),(2, '曲靖市', 26),(3, '玉溪市', 26),(4, '保山市', 26),(5, '昭通市', 26),(6, '丽江市', 26),(7, '思茅市', 26),(8, '临沧市', 26),(9, '文山壮族苗族自治州', 26),(10, '红河哈尼族彝族自治州', 26),(11, '西双版纳傣族自治州', 26),(12, '楚雄彝族自治州', 26),(13, '大理白族自治州', 26),(14, '德宏傣族景颇族自治州', 26),(15, '怒江傈傈族自治州', 26),(16, '迪庆藏族自治州', 26),(1, '西宁市', 27),(2, '海东地区', 27),(3, '海北藏族自治州', 27),(4, '黄南藏族自治州', 27),(5, '海南藏族自治州', 27),(6, '果洛藏族自治州', 27),(7, '玉树藏族自治州', 27),(8, '海西蒙古族藏族自治州', 27),(1, '西安市', 28),(2, '铜川市', 28),(3, '宝鸡市', 28),(4, '咸阳市', 28),(5, '渭南市', 28),(6, '延安市', 28),(7, '汉中市', 28),(8, '榆林市', 28),(9, '安康市', 28),(10, '商洛市', 28),(1, '南宁市', 29),(2, '柳州市', 29),(3, '桂林市', 29),(4, '梧州市', 29),(5, '北海市', 29),(6, '防城港市', 29),(7, '钦州市', 29),(8, '贵港市', 29),(9, '玉林市', 29),(10, '百色市', 29),(11, '贺州市', 29),(12, '河池市', 29),(13, '来宾市', 29),(14, '崇左市', 29),(1, '拉萨市', 30),(2, '那曲地区', 30),(3, '昌都地区', 30),(4, '山南地区', 30),(5, '日喀则地区', 30),(6, '阿里地区', 30),(7, '林芝地区', 30),(1, '银川市', 31),(2, '石嘴山市', 31),(3, '吴忠市', 31),(4, '固原市', 31),(5, '中卫市', 31),(1, '乌鲁木齐市', 32),(2, '克拉玛依市', 32),(3, '石河子市　', 32),(4, '阿拉尔市', 32),(5, '图木舒克市', 32),(6, '五家渠市', 32),(7, '吐鲁番市', 32),(8, '阿克苏市', 32),(9, '喀什市', 32),(10, '哈密市', 32),(11, '和田市', 32),(12, '阿图什市', 32),(13, '库尔勒市', 32),(14, '昌吉市　', 32),(15, '阜康市', 32),(16, '米泉市', 32),(17, '博乐市', 32),(18, '伊宁市', 32),(19, '奎屯市', 32),(20, '塔城市', 32),(21, '乌苏市', 32),(22, '阿勒泰市', 32),(1, '呼和浩特市', 33),(2, '包头市', 33),(3, '乌海市', 33),(4, '赤峰市', 33),(5, '通辽市', 33),(6, '鄂尔多斯市', 33),(7, '呼伦贝尔市', 33),(8, '巴彦淖尔市', 33),(9, '乌兰察布市', 33),(10, '锡林郭勒盟', 33),(11, '兴安盟', 33),(12, '阿拉善盟', 33),(1, '澳门特别行政区', 34),(1, '香港特别行政区', 35);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bearbookcan`.`feedback` WRITE;
DELETE FROM `bearbookcan`.`feedback`;
INSERT INTO `bearbookcan`.`feedback` (`type`,`details`,`information`) VALUES ('3', '我很认真的在填写信息 请好好查看', '1398909445@qq.com'),('3', '爱仕达撒大所', '1398909445@qq.com'),('1', '奥术大师大所大', '1398909445@qq.com'),('1', '萨达萨达大', '1398909445@qq.com'),('1', '11111111111111', '1398909445'),('1', '睡吧睡吧睡吧', '127737473'),('1', '测试007', '1398909445@qq.com'),('3', '测试0123123', '1398909445@qq.com'),('1', 'asdasdasd', '123123123123'),('2', '奥术大师多', '123123123');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bearbookcan`.`goods` WRITE;
DELETE FROM `bearbookcan`.`goods`;
INSERT INTO `bearbookcan`.`goods` (`goodsID`,`title`,`swiper`,`ju`,`juan`,`oldsell`,`comment`,`price`,`oldprice`,`label`,`limit`,`desc`) VALUES (123455, '【北极绒】儿童卡通刺绣纯棉防蚊裤', '/static/goods/123455/swiper01.jpg,/static/goods/123455/swiper02.jpg,/static/goods/123455/swiper03.jpg,/static/goods/123455/swiper04.jpg,/static/goods/123455/swiper05.jpg,/static/goods/123455/swiper06.jpg', '1', '2', '15.2', '16.1', 17.90, 19.90, NULL, NULL, '/static/goods/123455/desc01.jpg,/static/goods/123455/desc02.jpg,/static/goods/123455/desc03.jpg,/static/goods/123455/desc04.jpg,/static/goods/123455/desc05.jpg,/static/goods/123455/desc06.jpg'),(123456, '全款式8.8元！【保罗】男真皮自动扣皮带', '/static/goods/123456/swiper01.jpg,/static/goods/123456/swiper02.jpg,/static/goods/123456/swiper03.jpg,/static/goods/123456/swiper04.jpg,/static/goods/123456/swiper05.jpg,/static/goods/123456/swiper06.jpg', '1', '1', '17.3', '81.4', 8.80, 9.90, NULL, NULL, '/static/goods/123456/desc01.jpg,/static/goods/123456/desc02.jpg,/static/goods/123456/desc03.jpg,/static/goods/123456/desc04.jpg,/static/goods/123456/desc05.jpg,/static/goods/123456/desc06.jpg'),(123457, 'Ocean进口透明玻璃碗水果沙拉碗', '/static/goods/123457/swiper01.jpg,/static/goods/123457/swiper02.jpg,/static/goods/123457/swiper03.jpg,/static/goods/123457/swiper04.jpg,/static/goods/123457/swiper05.jpg,/static/goods/123457/swiper06.jpg', '1', '10', '1.2', '3.1', 9.90, 19.90, NULL, NULL, '/static/goods/123457/desc01.jpg,/static/goods/123457/desc02.jpg,/static/goods/123457/desc03.jpg,/static/goods/123457/desc04.jpg,/static/goods/123457/desc05.jpg,/static/goods/123457/desc06.jpg'),(123458, '【拍3件】甜苦瓜手撕面包多口味', '/static/goods/123458/swiper01.jpg,/static/goods/123458/swiper02.jpg,/static/goods/123458/swiper03.jpg,/static/goods/123458/swiper04.jpg,/static/goods/123458/swiper05.jpg,/static/goods/123458/swiper06.jpg', '1', '3', '11.2', '10.1', 16.40, 19.40, NULL, NULL, '/static/goods/123458/desc01.jpg,/static/goods/123458/desc02.jpg,/static/goods/123458/desc03.jpg,/static/goods/123458/desc04.jpg,/static/goods/123458/desc05.jpg,/static/goods/123458/desc06.jpg'),(123459, '【七彩之谜】古法黑糖', '/static/goods/123459/swiper01.jpg,/static/goods/123459/swiper02.jpg,/static/goods/123459/swiper03.jpg,/static/goods/123459/swiper04.jpg,/static/goods/123459/swiper05.jpg,/static/goods/123459/swiper06.jpg', '1', '10', '15.2', '16.1', 13.90, 23.90, NULL, NULL, '/static/goods/123459/desc01.jpg,/static/goods/123459/desc02.jpg,/static/goods/123459/desc03.jpg,/static/goods/123459/desc04.jpg,/static/goods/123459/desc05.jpg,/static/goods/123459/desc06.jpg'),(223455, '【馋莲】老北京枣糕2斤装16.9元！', '/static/goods/223455/swiper01.jpg,/static/goods/223455/swiper02.jpg,/static/goods/223455/swiper03.jpg,/static/goods/223455/swiper04.jpg,/static/goods/223455/swiper05.jpg,/static/goods/223455/swiper06.jpg', '1', '3', '4.6', '21.1', 16.90, 19.90, NULL, NULL, '/static/goods/223455/desc01.jpg,/static/goods/223455/desc02.jpg,/static/goods/223455/desc03.jpg,/static/goods/223455/desc04.jpg,/static/goods/223455/desc05.jpg,/static/goods/223455/desc06.jpg'),(223456, '【五谷源】网红手撕面包720g', '/static/goods/223456/swiper01.jpg,/static/goods/223456/swiper02.jpg,/static/goods/223456/swiper03.jpg,/static/goods/223456/swiper04.jpg,/static/goods/223456/swiper05.jpg,/static/goods/223456/swiper06.jpg', '0', '10', '4.6', '0.4', 19.80, 29.80, NULL, NULL, '/static/goods/223456/desc01.jpg,/static/goods/223456/desc02.jpg,/static/goods/223456/desc03.jpg,/static/goods/223456/desc04.jpg,/static/goods/223456/desc05.jpg,/static/goods/223456/desc06.jpg'),(223457, '第二件9.9！溜溜梅日式无核青梅饼', '/static/goods/223457/swiper01.jpg,/static/goods/223457/swiper02.jpg,/static/goods/223457/swiper03.jpg,/static/goods/223457/swiper04.jpg,/static/goods/223457/swiper05.jpg,/static/goods/223457/swiper06.jpg', '1', '5', '20.6', '2.9', 14.80, 19.80, NULL, NULL, '/static/goods/223457/desc01.jpg,/static/goods/223457/desc02.jpg,/static/goods/223457/desc03.jpg,/static/goods/223457/desc04.jpg,/static/goods/223457/desc05.jpg,/static/goods/223457/desc06.jpg'),(223458, '【拍两件】蒟蒻梅の冻120g*4袋', '/static/goods/223458/swiper01.jpg,/static/goods/223458/swiper02.jpg,/static/goods/223458/swiper03.jpg,/static/goods/223458/swiper04.jpg,/static/goods/223458/swiper05.jpg,/static/goods/223458/swiper06.jpg', '0', '10', '7.2', '2.1', 21.20, 31.20, NULL, NULL, '/static/goods/223458/desc01.jpg,/static/goods/223458/desc02.jpg,/static/goods/223458/desc03.jpg,/static/goods/223458/desc04.jpg,/static/goods/223458/desc05.jpg,/static/goods/223458/desc06.jpg'),(223459, '【拍5件】李佳琦推荐红谷林特产石头饼', '/static/goods/223459/swiper01.jpg,/static/goods/223459/swiper02.jpg,/static/goods/223459/swiper03.jpg,/static/goods/223459/swiper04.jpg,/static/goods/223459/swiper05.jpg,/static/goods/223459/swiper06.jpg', '1', '10', '19', '16', 19.90, 29.90, NULL, NULL, '/static/goods/223459/desc01.jpg,/static/goods/223459/desc02.jpg,/static/goods/223459/desc03.jpg,/static/goods/223459/desc04.jpg,/static/goods/223459/desc05.jpg,/static/goods/223459/desc06.jpg');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bearbookcan`.`goods_img` WRITE;
DELETE FROM `bearbookcan`.`goods_img`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bearbookcan`.`orders` WRITE;
DELETE FROM `bearbookcan`.`orders`;
INSERT INTO `bearbookcan`.`orders` (`ID`,`price`,`address`,`userName`,`descs`,`state`,`goodsID`,`allCount`,`phone`,`images`,`user`,`uemail`,`openid`,`goodsType`) VALUES (12345671, 17.90, 'asdasdasd', '1111', '【北极绒】儿童卡通刺绣纯棉防蚊裤', '-1', 123455, '1', '111111', '/static/goods/123455/swiper01.jpg', 'bearbookcan', '1398909445@qq.com', NULL, NULL),(12345672, 16.40, '小学初中', 'asd', '【拍3件】甜苦瓜手撕面包多口味', '-1', 123458, '1', '4444', '/static/goods/123458/swiper01.jpg', 'bearbookcan', '1398909445@qq.com', NULL, NULL),(12345677, 9.90, 'asdasdasd', '1111', 'Ocean进口透明玻璃碗水果沙拉碗', '-1', 123457, '1', '111111', '/static/goods/123457/swiper01.jpg', 'bearbookcan', '1398909445@qq.com', NULL, NULL),(12345678, 16.40, 'asdasdasd', '1111', '【拍3件】甜苦瓜手撕面包多口味', '-1', 123458, '2', '111111', '/static/goods/123458/swiper01.jpg', 'bearbookcan', '1398909445@qq.com', NULL, NULL),(12345679, 9.90, 'asdasdasd', '1111', 'Ocean进口透明玻璃碗水果沙拉碗', '-1', 123457, '2', '111111', '/static/goods/123457/swiper01.jpg', 'bearbookcan', '1398909445@qq.com', NULL, NULL),(12345680, 16.40, 'asdasdasd', '1111', '【拍3件】甜苦瓜手撕面包多口味', '2', 123458, '1', '111111', '/static/goods/123458/swiper01.jpg', 'bearbookcan', '1398909445@qq.com', NULL, NULL),(12345681, 13.90, 'asdasdasd', '1111', '【七彩之谜】古法黑糖', '2', 123459, '1', '111111', '/static/goods/123459/swiper01.jpg', 'bearbookcan', '1398909445@qq.com', NULL, NULL);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bearbookcan`.`province` WRITE;
DELETE FROM `bearbookcan`.`province`;
INSERT INTO `bearbookcan`.`province` (`ID`,`name`) VALUES (1, '北京市'),(2, '天津市'),(3, '上海市'),(4, '重庆市'),(5, '河北省'),(6, '山西省'),(7, '台湾省'),(8, '辽宁省'),(9, '吉林省'),(10, '黑龙江省'),(11, '江苏省'),(12, '浙江省'),(13, '安徽省'),(14, '福建省'),(15, '江西省'),(16, '山东省'),(17, '河南省'),(18, '湖北省'),(19, '湖南省'),(20, '广东省'),(21, '甘肃省'),(22, '四川省'),(23, '山东省'),(24, '贵州省'),(25, '海南省'),(26, '云南省'),(27, '青海省'),(28, '陕西省'),(29, '广西壮族自治区'),(30, '西藏自治区'),(31, '宁夏回族自治区'),(32, '新疆维吾尔自治区'),(33, '内蒙古自治区'),(34, '澳门特别行政区'),(35, '香港特别行政区');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bearbookcan`.`user_table` WRITE;
DELETE FROM `bearbookcan`.`user_table`;
INSERT INTO `bearbookcan`.`user_table` (` ID`,`user`,`password`,`name`,`email`,`province`,`city`,`qq`,`token`,`head`,`session_key`,`openid`) VALUES (1, 'bearbookcan', 'e10adc3949ba59abbe56e057f20f883e', 'bear', '202238452@qq.com', NULL, NULL, NULL, NULL, 'static/head/user001.jpg', NULL, NULL),(5, NULL, NULL, 'bear', NULL, NULL, NULL, NULL, NULL, '/static/head/user001.jpg', 'CsI4ZRVSWfeMVHG0omT9Lw==', 'oBanI5TvAjKJk6Bg45E4EmLFbT3s'),(6, NULL, NULL, 'bear', NULL, NULL, NULL, NULL, NULL, '/static/head/user002.jpg', 'VhZc3Gjyr3KqiDRRDtz67g==', 'oBanI5RLApGoZldi_UkOEDIlipIc');
UNLOCK TABLES;
COMMIT;
