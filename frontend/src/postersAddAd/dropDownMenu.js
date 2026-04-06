import { useEffect, useState } from "react";
export function DropDownMenu() {
  const [category, setCategory] = useState("jobs");

  return (
    <div>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="jobs">Работа</option>
        <option value="cars">Автомобили</option>
        <option value="electronics">Електроника</option>
        <option value="sellApartaments">Имоти Продажби</option>
      </select>
    </div>
  );
}
