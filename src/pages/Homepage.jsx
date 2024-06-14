import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Title from '../ui/Title';
import NovelGroup from '../ui/NovelGroup';
import Section from '../ui/Section';
import LinkButton from '../ui/LinkButton';
import { getAllNovels } from '../services/apiNovels';
import Spinner from '../ui/Spinner';

// const hotNovels = [
//   {
//     Id: 'luan-hoi-nhac-vien',
//     Title: 'Luân Hồi Lạc Viên',
//     Rate: 0,
//     Author: [
//       {
//         Id: '11461',
//         Name: 'Na Nhất Chích Văn Tử',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/99d2aa117de6f54b06b64cbbebef2b435336977dfee71f2ee5766d48b31734f3.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'muc-than-ky',
//     Title: 'Mục Thần Ký',
//     Rate: 0,
//     Author: [
//       {
//         Id: '190',
//         Name: 'Trạch Trư',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'tro-choi-nay-cung-qua-chan-that-gia-du-hi-da-thai-chan-thuc-lieu',
//     Title: 'Trò Chơi Này Cũng Quá Chân Thật (Giá Du Hí Dã Thái Chân Thực Liễu)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '12745',
//         Name: 'Thần Tinh LL',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/a9e7efdf021895765e8aeb828842e51a88b4b45bf2b802aca2fd1b6902cae7b4.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'quy-bi-chi-chu',
//     Title: 'Quỷ Bí Chi Chủ',
//     Rate: 0,
//     Author: [
//       {
//         Id: '1011',
//         Name: 'Ái Tiềm Thủy đích Ô Tặc',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/23b9f814404ee0a32d03f7d09d762075ef88b0730b0537c8f70ee36c1b37af5e.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'thanh-lien-chi-dinh',
//     Title: 'Thanh Liên Chi Đỉnh',
//     Rate: 0,
//     Author: [
//       {
//         Id: '14618',
//         Name: 'Tiêu Thập Nhất Mạc',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/b43cccd662ad09fe742e1bf021cd42832b1b854840b9873296133bb39e274990.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'van-co-mạnh-nhát-tong',
//     Title: 'Vạn Cổ Tối Cường Tông',
//     Rate: 0,
//     Author: [
//       {
//         Id: '13470',
//         Name: 'Giang Hồ Tái Kiến',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/36dbfe77d4231dc2371cba476a957fd1deeb31f684576e4d55f4bbf2b7ff44a1.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'xich-tam-tuan-thien',
//     Title: 'Xích Tâm Tuần Thiên',
//     Rate: 0,
//     Author: [
//       {
//         Id: '22716',
//         Name: 'Tinh Hà Dĩ Thậm',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/b306043cbaac0a2ef003da0f031a5dc37b594eff759e00a036369066d5dde261.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'lam-uyen-hanh',
//     Title: 'Lâm Uyên Hành',
//     Rate: 0,
//     Author: [
//       {
//         Id: '190',
//         Name: 'Trạch Trư',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/557dd3fc3f41ec0cfbe8493e884f64bff531e15af777f8f6933c0cafc2b6ea59.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'hao-huu-tu-vong-nga-tu-vi-huu-de-thang-lieu',
//     Title: 'Hảo Hữu Tử Vong: Ngã Tu Vị Hựu Đề Thăng Liễu',
//     Rate: 0,
//     Author: [
//       {
//         Id: '23890',
//         Name: 'Lão Bà Đại Đại',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/9aebe153e541148fe3c8136af409085386709bafe0666436e9cd88ce7867b4f4.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'nga-huu-nhat-toa-khung-bo-oc---ta-co-mot-toa-khung-bo-phong',
//     Title: 'Ta Có Một Tòa Nhà Ma (Ngã Hữu Nhất Tọa Khủng Bố Ốc)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '15360',
//         Name: 'Ngã Hội Tu Không Điều',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/d62cc37d27992f60b6382a6e823906cd2421784cfceac2959e77572263933f18.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'chu-gioi-tan-the-online',
//     Title: 'Chư Giới Mạt Nhật Tại Tuyến',
//     Rate: 0,
//     Author: [
//       {
//         Id: '13741',
//         Name: 'Yên Hỏa Thành Thành',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/3ede5e34b1f04c8d1d4ba0dc1ff1ba5aee60bb59cab829a16b0162ccdaf51713.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'hac-am-huyet-thoi-dai---reconvert-2',
//     Title: 'Hắc Ám Huyết Thời Đại - [Re-convert]',
//     Rate: 0,
//     Author: [
//       {
//         Id: '1590',
//         Name: 'Thiên Hạ Phiêu Hỏa',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/bce9099e6d145b886f6bd4ccdb0f3a7ad9059b73656598f7c9c093480b3299ff.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'khai-cuc-nu-ma-dau-phu-ta',
//     Title: 'Khai Cục Nữ Ma Đầu Phụ Ta (Khai Cục Nữ Ma Đầu Phụ Liễu Ngã)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '23812',
//         Name: 'Phạ Lạt Đích Hồng Tiêu',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/07e19df92fc1c25c2346c010df7972eec4a6115b6442268c281c268739e73283.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'thap-phuong-vu-thanh',
//     Title: 'Thập Phương Võ Thánh',
//     Rate: 0,
//     Author: [
//       {
//         Id: '315',
//         Name: 'Cổn Khai',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/d9e57c2599896cdf867055a3bd96f255894ad419b2e42a670bfd9a18fe91ffb6.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'dan-hoang-vo-de',
//     Title: 'Đan Hoàng Võ Đế',
//     Rate: 0,
//     Author: [
//       {
//         Id: '318',
//         Name: 'Thí Nghiệm Chuột Bạch',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/7040993bc200aca4c2b1fd4f24a98fd59268e1f8e6d76c93717cf32c8e65f674.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'vinh-hang-quoc-do',
//     Title: 'Vĩnh Hằng Quốc Độ',
//     Rate: 0,
//     Author: [
//       {
//         Id: '718',
//         Name: 'Cô Độc Phiêu Lưu',
//       },
//     ],
//     Genre: null,
//     CoverImage: 'https://www.nae.vn/ttv/ttv/public/images/story/13951.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'quy-tam-quoc',
//     Title: 'Quỷ Tam Quốc',
//     Rate: 0,
//     Author: [
//       {
//         Id: '13521',
//         Name: 'Mã Nguyệt Hầu Niên',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/db460080ecb8d6af55606bb7870df6d5858553dcf44ddb59352ccb13db52ab41.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'kiem-lai',
//     Title: 'Kiếm Lai',
//     Rate: 0,
//     Author: [
//       {
//         Id: '483',
//         Name: 'Phong Hỏa Hí Chư Hầu',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/412da78bb6a8e77783509b0e05cd92ea605563f6aa245f389e5a4db89709d58d.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'dao-quan',
//     Title: 'Đạo Quân',
//     Rate: 0,
//     Author: [
//       {
//         Id: '711',
//         Name: 'Dược Thiên Sầu',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/9f06abeec1a25072b441d62ec3069c5e8f09d940475db1657cbc7761685110db.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'tu-chan-lieu-thien-quan',
//     Title: 'Tu Chân Liêu Thiên Quần',
//     Rate: 0,
//     Author: [
//       {
//         Id: '12498',
//         Name: 'Thánh Kỵ Sĩ Đích Truyền Thuyết',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/4323f1b4debde573725e1f098c4d3e5d3faa468303df00f1f7784457cea957c7.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
// ];

// const completedNovels = [
//   {
//     Id: 'mon-phai-duong-thanh-nhat-chi',
//     Title: 'Môn Phái Dưỡng Thành Nhật Chí',
//     Rate: 0,
//     Author: [
//       {
//         Id: '24328',
//         Name: 'Huyền Tinh',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/e98987c0228b6352c3bd793ac1259b8e2775a02a22445ddd3e4a88aa9a2b70f1.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'ta-tai-huyen-huyen-the-gioi-gia-mao-thien-co-than-toan-nga-tai-huyen-huyen-the-gioi-mao-sung-thien-ky-than-toan',
//     Title: 'Ngã Tại Huyền Huyễn Thế Giới Mạo Sung Thiên Cơ Thần Toán',
//     Rate: 0,
//     Author: [
//       {
//         Id: '447',
//         Name: 'Tàn Kiếm',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/7a5388dc8298806a6164b409d0ecbb0d440cde0f82d298bc2bb80d006fc11ce1.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'hai-tac-cai-thu-nhat-dong-ban-la-meo-tom-hai-tac-de-nhat-ca-hoa-ban-thi-thang-mo-mieu',
//     Title:
//       'One Piece: Đồng Bạn Đầu Tiên Là Mèo Tom (Hải Tặc: Đệ Nhất Cá Hỏa Bạn Thị Thang Mỗ Miêu)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '24516',
//         Name: 'Tưởng Cật Băng Bổng',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/b3e43ff737b9c69fd24aaf1c7c549df4a7c3d0e7f1566a9ae9e1672358713292.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'do-trong-sinh-lieu-thuy-dam-luyen-ai-a-cung-song-lai-ai-yeu-duong-a',
//     Title:
//       'Đô Trọng Sinh Liễu Thùy Đàm Luyến Ái A (Cũng Sống Lại Ai Yêu Đương A)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '25294',
//         Name: 'Thác Na Nhi Liễu',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/9da19fd1167f9fef5561f5b5ab8d04cb2e2d262d8f67ac71c01f5ade39a7b9aa.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'ta-von-khong-y-thanh-tien',
//     Title: 'Ta Vốn Không Ý Thành Tiên (Ngã Bản Vô Ý Thành Tiên)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '23766',
//         Name: 'Kim Sắc Mạt Lỵ Hoa',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/ec555926de8f3cb9ed079084df15bc74f0a300413d0bf6184bbcd861f868655d.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: '3950-ma-ton',
//     Title: 'Ma Tôn',
//     Rate: 0,
//     Author: [
//       {
//         Id: '24099',
//         Name: 'Vô Uyên',
//       },
//     ],
//     Genre: null,
//     CoverImage: 'https://www.nae.vn/ttv/ttv/public/images/story/3950.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'tu-phuc-su-chuyen-gia-sua-chua',
//     Title: 'Tu Phục Sư (Chuyên Gia Sửa Chữa)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '1112',
//         Name: 'Đả Nhãn',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/f12e25400f6fe42e794422d76203073e38c22921c495b29eebcc68a6c4a14a6a.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'nghe-noi-nguoi-rat-chanhthinh-thuyet-nhi-ngan-due-a',
//     Title: 'Chưởng Môn Đê Điều Điểm',
//     Rate: 0,
//     Author: [
//       {
//         Id: '14964',
//         Name: 'Ấu Nhi Viên Nhất Bả Thủ',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/f4ee789024fe48b32c50b483ffc286a0c396cd14a2024616794b230764c9ee18.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'khoa-pho-vat-ly-giao-xuat-nhat-phieu-phap-than-khoa-pho-vat-ly-day-ra-mot-phieu-phap-than',
//     Title:
//       'Khoa Phổ Vật Lý, Giáo Xuất Nhất Phiếu Pháp Thần (Khoa Phổ Vật Lý, Dạy Ra Một Phiếu Pháp Thần?)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '2613',
//         Name: 'Dư Vân Phi',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/3840c774936da22a534320d977e51a4874ded100f944ea55746a8341c270f6e2.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'toan-dan-linh-chu-nga-khao-tac-te-tranh-ba',
//     Title: 'Toàn Dân Lĩnh Chủ: Ngã Kháo Tác Tệ Tranh Phách',
//     Rate: 0,
//     Author: [
//       {
//         Id: '25527',
//         Name: 'Tiểu Hào Yêu Hồ',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/099f9187ef5d685b8509bf8e841952745ea127fe3b02405f9d09519f3fa19cbb.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'ai-bao-nguoi-nang-luc-dung-nhu-vay-thuy-nhuong-nhi-nang-luc-gia-yeu-dung-dich',
//     Title:
//       'Ai Bảo Ngươi Năng Lực Dùng Như Vậy? (Thùy Nhượng Nhĩ Năng Lực Giá Yêu Dụng Đích?)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '24141',
//         Name: 'Thái Bạch Thủy Quân',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/ad0d391892cd6e959045e89759c1e276525e35a7aba296a4a226b93f19d3ad87.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'trong-sinh-phi-duong-nien-dai',
//     Title: 'Trùng Sinh Phi Dương Niên Đại',
//     Rate: 0,
//     Author: [
//       {
//         Id: '20794',
//         Name: 'Kim Thiềm Lão Tổ',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/085339edd8d1f181ea709879862bebddf69e1f426809e10b9015359fa887bbba.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'tong-vong-vu-tu-azeroth-an-den-son-hai-kinh',
//     Title:
//       'Tổng Võng Vu: Từ Azeroth Ăn Đến Sơn Hải Kinh (Tống Võng Đích Vu: Tòng Ngả Trạch Lạp Tư Cật Đáo Sơn Hải Kinh)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '15617',
//         Name: 'Dịch Thương Thu Giả',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/9aabf22422f83feb0a905f91f52eee1ad967a9908c67199d587ee4827a65f204.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'hoang-mac-linh-chu-nga-huu-nhat-toa-huan-luyen-trang-hoang-mac-lanh-chua-ta-co-mot-toa-san-huan-luyen',
//     Title:
//       'Hoang Mạc Lĩnh Chủ: Ngã Hữu Nhất Tọa Huấn Luyện Tràng (Hoang Mạc Lãnh Chúa: Ta Có Một Tòa Sân Huấn Luyện)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '25526',
//         Name: 'Tác Giả Quân Vô Hạn Tiến Hóa',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/33952cfaf59f23d34fd3fc91ddab1f6dc0c3531052e321d128c58c17f342be26.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'gia-ca-phong-than-bat-chinh-thuong',
//     Title: 'Giá Cá Phong Thần Bất Chính Thường',
//     Rate: 0,
//     Author: [
//       {
//         Id: '25522',
//         Name: 'Nghịch Tử Đa Đa',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/b967088bcb20d5d3fbbbbcdb0d349df54ad8e08d63cedad0541135ad17ed67e0.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'quoc-vuong',
//     Title: 'Quốc Vương',
//     Rate: 0,
//     Author: [
//       {
//         Id: '18071',
//         Name: 'Tân Hải Nguyệt 1',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/1704606202e5fb2a4bf707b62eda2cca420542ea7ef09abdbdb5362e7516dd24.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'ta-than-dung-la-ta-chinh-minh',
//     Title: 'Tà Thần Đúng Là Ta Chính Mình? (Tà Thần Cánh Thị Ngã Tự Kỷ?)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '25474',
//         Name: 'Cựu Nhật Nhân Ngẫu',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/4227e74bdc3efa15251392599e7767dfc0e487fc4c1794ff44c54e9e08db04cc.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'ghi-ban-di!-huan-luyen-vien',
//     Title: 'Ghi Bàn Đi! Huấn Luyện Viên (Tiến Cầu Ba! Giáo Luyện)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '2129',
//         Name: 'Trần Ái Đình',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/6b42792caa5c0c672e2f9028a85d325f2e1260ccb6521037ef33bebaf69e581c.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'trung-nhi-thieu-nu-hokage-hanh-trinh',
//     Title:
//       'Trung Nhị Thiếu Nữ Hokage Hành Trình (Trung Nhị Thiểu Nữ Đích Hỏa Ảnh Chi Lữ)',
//     Rate: 0,
//     Author: [
//       {
//         Id: '25471',
//         Name: 'Tô Gia Đích Tô',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/1d30530dbb8553e645fc4512a432508d41c801585d35a94d299db4e8d0c6e227.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
//   {
//     Id: 'qua-khi-vu-lam-cao-thu-trong-sinh-tam-thap-nien-tien',
//     Title: 'Quá Khí Võ Lâm Cao Thủ Trùng Sinh Tam Thập Niên Tiền',
//     Rate: 0,
//     Author: [
//       {
//         Id: '19629',
//         Name: 'Hành Vi Kim Dung',
//       },
//     ],
//     Genre: null,
//     CoverImage:
//       'https://www.nae.vn/ttv/ttv/public/images/story/c2ac3ddba1becf5f5f472a23d4647ca8bb050b7f1696a1a5ae5cc1a50b7851dc.jpg',
//     Description: '',
//     Status: '',
//     Chapters: null,
//     LatestChapter: null,
//   },
// ];

const history = [
  {
    Id: 'luan-hoi-nhac-vien',
    Title: 'Luân Hồi Lạc Viên',
    Rate: 0,
    Author: [
      {
        Id: '11461',
        Name: 'Na Nhất Chích Văn Tử',
      },
    ],
    Genre: null,
    CoverImage:
      'https://www.nae.vn/ttv/ttv/public/images/story/99d2aa117de6f54b06b64cbbebef2b435336977dfee71f2ee5766d48b31734f3.jpg',
    Description: '',
    Status: '',
    Chapters: null,
    LatestChapter: null,
  },
  {
    Id: 'muc-than-ky',
    Title: 'Mục Thần Ký',
    Rate: 0,
    Author: [
      {
        Id: '190',
        Name: 'Trạch Trư',
      },
    ],
    Genre: null,
    CoverImage:
      'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
    Description: '',
    Status: '',
    Chapters: null,
    LatestChapter: null,
  },
  {
    Id: 'tro-choi-nay-cung-qua-chan-that-gia-du-hi-da-thai-chan-thuc-lieu',
    Title: 'Trò Chơi Này Cũng Quá Chân Thật (Giá Du Hí Dã Thái Chân Thực Liễu)',
    Rate: 0,
    Author: [
      {
        Id: '12745',
        Name: 'Thần Tinh LL',
      },
    ],
    Genre: null,
    CoverImage:
      'https://www.nae.vn/ttv/ttv/public/images/story/a9e7efdf021895765e8aeb828842e51a88b4b45bf2b802aca2fd1b6902cae7b4.jpg',
    Description: '',
    Status: '',
    Chapters: null,
    LatestChapter: null,
  },
];

// const selectRandomNovel = novels => {
//   const index = Math.trunc(Math.random() * novels.length);

//   return novels[index];
// };

function Homepage() {
  const [hotNovels, setHotNovels] = useState([]);
  const [completedNovels, setCompletedNovels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const { CoverImage: coverImage } = selectRandomNovel(hotNovels);

  // const [searchParams] = useSearchParams();
  // const genre = searchParams.get('genre');

  // useEffect(
  //   function () {
  //     async function getNovels() {
  //       const res = await fetch(`http://localhost:8080/novels?genre=${genre}`);
  //       const data = await res.json();
  //       console.log(data);
  //     }

  //     if (!genre) return;

  //     getNovels();
  //   },
  //   [genre],
  // );

  useEffect(function () {
    async function getHomePageData() {
      setIsLoading(true);
      const hotNovels = await getAllNovels({ category: 'truyen-hot' });
      const completedNovels = await getAllNovels({
        category: 'truyen-hoan-thanh',
      });

      setHotNovels(hotNovels);
      setCompletedNovels(completedNovels);

      setIsLoading(false);
    }

    getHomePageData();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      {/* <img
        className="inline-block aspect-square h-80 w-full p-2"
        src={coverImage}
        alt="novel cover"
      /> */}
      <div className="mt-5 grid grid-cols-[1fr_200px] items-start gap-x-8">
        <div>
          <Section>
            <Title>
              <ion-icon
                class="title-icon"
                name="trending-up-outline"
              ></ion-icon>
              Truyện hot
            </Title>
            <NovelGroup novels={hotNovels} type="grid" />
          </Section>

          <Section>
            <Title>
              <ion-icon
                class="title-icon"
                name="checkmark-done-outline"
              ></ion-icon>
              Truyện đã hoàn thành
            </Title>
            <NovelGroup novels={completedNovels} type="grid" />
          </Section>
        </div>

        <Section>
          <Title>
            <ion-icon class="title-icon" name="book-outline"></ion-icon>
            Lịch sử
          </Title>
          <NovelGroup novels={history} type="list" />

          <div className="self-end">
            <LinkButton to="reading-history">Xem thêm &rarr;</LinkButton>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Homepage;
