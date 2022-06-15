import { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Banana Shake",
//     description: "Smoothy made from banana , milk , sugar and dry fruits.",
//     price: 40,
//   },
//   {
//     id: "m2",
//     name: "Daal Chawal",
//     description: "Cooked Rice , whole grains",
//     price: 50,
//   },
//   {
//     id: "m3",
//     name: "Roti Sabji",
//     description: "Wheat Tortilla and seasonal vegetable with gravy.",
//     price: 60,
//   },
//   {
//     id: "m4",
//     name: "Paneer Tikka",
//     description: "Paneer and vegetable smoked in open fire",
//     price: 80,
//   },
// ];

const AvailableMeals = (props) => {
  const [dbMeals, setDbMeals] = useState([]);
  const [isLoadingMeals, setIsLoadingMeals] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-meal-5d301-default-rtdb.firebaseio.com/meals.json"
      );

      // console.log(response);
      if (!response.ok) {
        throw new Error("Error occured while  loading meals...");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          key: key,
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      // console.log(loadedMeals);
      setIsLoadingMeals(false);
      setDbMeals(loadedMeals);
    };

    fetchMeals().catch((error) => {
      setIsLoadingMeals(false);
      setHttpError(error);
      // console.log(error.message);
    });
  }, []);

  if (isLoadingMeals) {
    return (
      <section className={classes.loading}>
        <p>Loading Meals...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError.message}</p>
      </section>
    );
  }

  const mealsList = dbMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
