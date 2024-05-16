import express from "express";
import Product from "../schemas/product.schema.js";

const router = express.Router();

//상품 생성 API
router.post("/products", async (req, res, next) => {
  //클라이언트로부터 value 데이터 가져오기
  const { name, description, manager, password } = req.body;
  const status = "FOR_SALE";
  const createdAt = new Date();
  const updatedAt = new Date();

  //상품 등록
  const product = new Product({
    name,
    description,
    manager,
    password,
    status,
    createdAt,
    updatedAt,
  });
  await product.save();

  //상품 등록 클라이언트에게 반환
  return res.status(201).json({ product });
});

//상품 조회 API
router.get("/products", async (req, res, next) => {
  //상품 목록 조회 진행
  const products = await Product.find()
    .sort("-createdAt")
    .select("_id name description manager status createdAt updatedAt")
    .exec();

  //상품 목록 조회 결과를 클라이언트에게 반환
  return res.status(200).json({ products });
});

//상품 상세 조회 API
router.get("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const findProduct = await Product.findOne({ _id: productId })
    .select("_id name description manager status createdAt updatedAt")
    .exec();

  return res.status(200).json({ products: findProduct });
});

//상품 수정 API
router.patch("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, manager, password, status } = req.body;

  const currentProduct = await Product.findById(productId).exec();
  if (currentProduct.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await Product.updateOne(
    { _id: productId },
    { $set: { name, description, manager, status } },
  );

  return res.status(200).json({});
});

//상품 삭제 API
router.delete("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { password } = req.body;

  const product = await Product.findById(productId).exec();
  if (product.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await Product.deleteOne({ _id: productId });

  return res.status(200).json({});
});

export default router;
