export class SessionUser {
    private authUser: any;
    public uName: string;
    public uPhoto: string;
    public uProfile: string;
    public uDate: Date;
    private _router: any;

    constructor(
        private router
    ) {
        this._router = router;
    }

    getAuthUser() {

        let data = atob(localStorage.getItem('rsltnsri'));
        this.authUser = JSON.parse(data);
        this.uName = this.authUser.name + ' ' + this.authUser.lastName;
        this.uPhoto = this.authUser.photo;
        this.uDate = this.authUser.created_at;
    }

    logOut() {
        sessionStorage.clear();
        localStorage.clear();
        this._router.navigate(['/auth/login']);
    }

}