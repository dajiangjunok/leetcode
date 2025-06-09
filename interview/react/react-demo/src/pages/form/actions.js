
export async function addToCart(prevState, queryData, carList, setCarList) {
  const bookName = queryData.get('bookName');
  if (bookName === "权威指南") {
    // 认为添加延迟以使等待更明显。
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    return "无法加入购物车：商品已售罄";
  } else {
    setCarList([...carList, { bookName: bookName, }])
    return "已加入购物车";

  }
}