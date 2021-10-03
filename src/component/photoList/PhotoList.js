import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import productApi from "../../API/productApi";
import {
  addToEdit
} from "../../features/Photo/photoSlice";
import PhotoDisplay from "../PhotoDisplay/PhotoDisplay";
import "./PhotoList.scss";


PhotoList.propTypes = {};

function PhotoList(props) {
  console.log('on photo list')
  /* connect to redux store */ /* state.photos & state.counter -- store.js */

  // const photoLibrary = useSelector(
  //   (state) => state.photos
  // ); /* state.photos & state.counter -- store.js */

  const dispatch = useDispatch();

  //dispatch(editPhotoResetState());

  /* Remove */
  const [remove, setRemove] = useState(false); // to rerender after photolist after remove
  const onRemoveButtonClick = (target) => {
    //dispatch(removePhoto(target));
    // because axios client do not catch error so use axios
    const deleteData = async () => {
      await axios
        .delete(`http://localhost:3001/photos/${target.id}`)
        .then(() => setRemove(true))
        .catch((e) => alert(e));
    };
    deleteData();
  };

  /* Edit */
  const onEditButtonClick = (target) => {
    dispatch(addToEdit(target));
  };

  /* connect to data base to get photo */
  const [listOfPhoto, setListofPhoto] = useState([0]);

  const user = useSelector((state) => state.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    //setFilter(user.current.id)
    if (!isLogin) {
      setListofPhoto([]);
      return;
    } else {
      const fetchData = async () => {
        try {
          const data = await productApi.getAll(user.current.id);
          setListofPhoto(data);
          setRemove(false);
        } catch (error) {
          alert("get: error when connect to database");
        }
      };
      fetchData();
    }
  }, [user, isLogin, remove]);

  return (
    <div className="photo-list">
      <Container>
        <Row className="justify-content-sm-flex-start">
          {listOfPhoto.map((photo) => (
            <PhotoDisplay
              key={photo.id}
              photo={photo}
              onRemoveButtonClick={onRemoveButtonClick}
              onEditButtonClick={onEditButtonClick}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PhotoList;
