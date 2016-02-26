'use strict';

export let download = ( text, name, type ) => {

	return () => {
		let a = document.createElement("a");
		let file = new Blob([text], {type: type});

		a.href = URL.createObjectURL(file);
		a.download = name;
		a.click();
	}

}
