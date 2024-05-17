##상품 CRUD 서버
이 프로젝트는 Node.js와 Express 프레임워크를 사용하여 상품의 CRUD(Create, Read, Update, Delete) 작업을 수행하는 RESTful API를 구현한 것입니다.

##도메인 링크
http://lilyda.shop:3000/api/products

##사용 가능한 API 엔드포인트
GET /api/products: 모든 상품 목록을 조회합니다.
GET /api/products/:id: 특정 상품의 상세 정보를 조회합니다.
POST /api/products: 새로운 상품을 생성합니다.
PATCH /api/products/:id: 기존 상품을 수정합니다.
DELETE /api/products/:id: 특정 상품을 삭제합니다.
각 API 엔드포인트에 대한 자세한 설명은 서버 소스 코드와 함께 확인할 수 있습니다.

##기술 스택
Node.js
Express.js
