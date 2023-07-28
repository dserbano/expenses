const listSort = {

    sortByString(listOfElements: Array<any>, key: string, ascending: boolean) {
        return listOfElements.sort((a, b) => {
            if (ascending == true) {
                return (a[key] < b[key]) ? -1 : 1
            } else if (ascending == false)  {
                return (a[key] > b[key]) ? -1 : 1
            }
            return 0;
        });
    }

};

export default listSort;