/**
 * The function `openSidebar` is used to open a sidebar by setting the CSS properties of the document
 * body and the HTML element.
 */
export const openSidebar = () => {
	if (typeof document !== "undefined") {
		document.body.style.overflow = "hidden";
		document.documentElement.style.setProperty(
			"--SideNavigation-slideIn",
			"1"
		);
	}
};

/**
 * The closeSidebar function removes the slide-in animation from the sidebar and restores the overflow
 * property of the body element.
 */
export const closeSidebar = () => {
	if (typeof document !== "undefined") {
		document.documentElement.style.removeProperty(
			"--SideNavigation-slideIn"
		);
		document.body.style.removeProperty("overflow");
	}
};
/**
 * The function toggles the sidebar by checking the CSS property value and either closing or opening
 * the sidebar accordingly.
 */

export const toggleSidebar = () => {
	if (typeof window !== "undefined" && typeof document !== "undefined") {
		const slideIn = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue("--SideNavigation-slideIn");
		if (slideIn) {
			closeSidebar();
		} else {
			openSidebar();
		}
	}
};

export const enum Selected {
	HOME,
	ABOUT,
	FORUM,
	ACCOUNT,
}
