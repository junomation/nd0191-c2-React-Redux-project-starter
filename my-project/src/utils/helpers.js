import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return d.toLocaleDateString() + ' ' + time.substr(0, 5) + time.slice(-2)
  }
  
export function sortQuestionsByTimestamp (questions) {
    return Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)
  }
  