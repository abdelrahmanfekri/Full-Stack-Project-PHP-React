import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cart from "./Cart";
import { gql } from "@apollo/client";
import client from "../apollo/apolloClient";

const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      active: "",
    };
  }

  componentDidMount() {
    client.query({ query: GET_CATEGORIES }).then((result) => {
      this.setState({ categories: result.data.categories }, () => {
        this.updateActiveCategory();
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.updateActiveCategory();
    }
  }

  updateActiveCategory() {
    let active = this.props.location.pathname.split("/")[1].toLowerCase();
    if (active === "" && this.state.categories.length > 0) {
      active = this.state.categories[0].name.toLowerCase();
    }
    this.setState({ active });
  }

  render() {
    return (
      <nav className="flex justify-between items-center py-4 border-b px-40">
        <div className="flex space-x-4">
          {this.state.categories.map((category) => (
            <Link
              key={category.name}
              to={`/${category.name.toLowerCase()}`}
              className={
                "text-green-500 border-b-2" +
                (category.name.toLowerCase() === this.state.active
                  ? " border-green-500"
                  : "")
              }
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <div className="bg-green-500 p-2 rounded-md mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Cart />
        </div>
      </nav>
    );
  }
}

function HeaderWrapper(props) {
  const location = useLocation();
  return <Header {...props} location={location} />;
}

export default HeaderWrapper;
