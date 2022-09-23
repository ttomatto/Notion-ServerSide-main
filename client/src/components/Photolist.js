import React from "react";
import PhotoItem from "./PhotoItem";

export default function PhotoList(props){
  return (
    <div>
      {props.photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
