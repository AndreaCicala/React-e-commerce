import { useState, useEffect } from "react";
import { Product } from "./product";

const product = [
  {
    title: "prodotto 1",
    price: 0,
    image: "",
  },
  {
    title: "prodotto 2",
    price: 0,
    image: "",
  },
  {
    title: "prodotto 3",
    price: 0,
    image: "",
  },
  {
    title: "prodotto 4",
    price: 0,
    image: "",
  },
  {
    title: "prodotto 5",
    price: 0,
    image: "",
  },
  {
    title: "prodotto 6",
    price: 0,
    image: "",
  },
];

export const List = (props) => {
  const [source, setSource] = useState([]);
  const [products, setProducts] = useState(product);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setSource(data);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = source.filter((product) => {
      if (props.category === "everything") {
        return product;
      } else {
        return product.category === props.category;
      }
    });
    setProducts(filtered);
    // eslint-disable-next-line
  }, [props.category]);

  useEffect(() => {
    const filtered = source.filter((product) =>
      product.title.toLowerCase().includes(props.filter.toLowerCase())
    );
    setProducts(filtered);
    // eslint-disable-next-line
  }, [props.filter]);

  return (
    <section>
      <ul className="grid">
        {products.map((item, index) => (
          <li key={index} className={isLoading ? "loading" : ""}>
            <Product
              price={item.price + "€"}
              title={item.title}
              image={item.image}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
