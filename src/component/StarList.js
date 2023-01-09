import Utils from "../utils/Utils";
import Star from "./Star";

const StarList = (props) => {

  return (
    <div>
      {Utils.range(1, props.stars).map(starId =>
        <Star key={starId}/>
      )}
    </div>
  );
}

export default StarList;