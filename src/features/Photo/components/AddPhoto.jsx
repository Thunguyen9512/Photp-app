import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../API/productApi";
import Banner from "../../../component/banner/Banner";
import image from "../../../component/constant/image";
import PhotoForm from "../../../component/photoForm/PhotoForm";
import "./AddPhoto.scss";


AddPhoto.propTypes = {};

function AddPhoto(props) {
  const user = useSelector((state) => state.user);

  const formSubmit = (values) => {
    console.log("on Form Submit")
    values.authorId = user.current.id;
    //add data to redux
    //dispatch(addPhoto(values));
    //post data to database and return true to trigger isSubmitting
    const fetchData = async () => {
      try {
        await productApi.postData(values);
        alert("success");
      } catch (error) {
        alert("error when connect to database");
      }
      return true;
    };
    return fetchData();
  };

  return (
    <div className="add-photo">
      <Banner backgroundURL={image.image05} title="ADD YOUR PHOTO"></Banner>
      <PhotoForm action={formSubmit} state = "add" />
    </div>
  );
}

export default AddPhoto;
