import React from "react";
import styles from "./UserLoggedIcon.module.css";

type UserLoggedIconType = {
	userData: string;
};

const UserLoggedIcon: React.FC<UserLoggedIconType> = ({ userData }) => {
	return <div className={styles.wrapper}>{userData}</div>;
};

export default UserLoggedIcon;
