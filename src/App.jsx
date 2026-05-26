import {BrowserRouter, Routes, Route} from "react-router-dom";
import RootLayout from "../src/layout/RootLayout.jsx";
import Main from "../src/pages/Main/Main.jsx"
import ItemDetail from "./pages/ItemDetail/ItemDetail.jsx";
import ItemAdd from "./pages/ItemInsert/ItemAdd.jsx";
import ItemEdit from "./pages/ItemInsert/ItemEdit.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<ItemAdd/>}/> {/* 추후 element에 상품 등록 페이지 들어가야함 */}
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/edit/:id" element={<ItemEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;