/* EDIT PHOTO COMPONENT */

import React from "react";
import { useSelector } from "react-redux";
import productApi from "../../../API/productApi";
import Banner from "../../../component/banner/Banner";
import image from "../../../component/constant/image";
import PhotoForm from "../../../component/photoForm/PhotoForm";

EditPhoto.propsTypes = {};

function EditPhoto(props) {


  /* formUpdate - update data to database */
  const formUpdate = (values) => {
    //update data to database and return true to trigger isSubmitting
    const id = values.id;
    const fetchData = async () => {
      try {
        await productApi.putData(id, values);
        alert(" update success");
      } catch (error) {
        alert("edit: error when connect to database");
      }
      return true;
    };
    return fetchData();

    //fetch API to add to update database
  };

  const editPhoto = useSelector(
    (state) => state.photos
  ); /* state.photos & state.counter -- store.js */

  return (
    <>
      <Banner backgroundURL={image.image05} title="EDIT YOUR PHOTO"></Banner>
      <PhotoForm action = {formUpdate} editPhoto = {editPhoto} state = "edit"></PhotoForm>
    </>
  );
}

export default EditPhoto;
