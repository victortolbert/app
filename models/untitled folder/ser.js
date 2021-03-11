import Model from "./Model";

export default class User extends Model {
    resource() {
        return "users";
    }

    // computed properties are reactive -> user.fullname
    // make sure to use "get" prefix
    get fullname() {
        return `${this.first_name} ${this.last_name}`;
    }

    get isTrashed() {
        return this.hasOwnProperty("deleted_at") && this.deleted_at !== null;
    }

    get isBlocked() {
        return this.hasOwnProperty("blocked_at") && this.blocked_at !== null;
    }

    get isEmailVerified() {
        return (
            this.hasOwnProperty("email_verified_at") &&
            this.email_verified_at !== null
        );
    }

    getRoleNames() {
        if (!this.hasOwnProperty("roles")) {
            return [];
        }
        return this.roles.map(role => role.name);
    }

    getPermissionNames() {
        if (!this.hasOwnProperty("permissions")) {
            return [];
        }
        return this.permissions.map(permission => permission.name);
    }

    hasRole(roles) {
        if (Array.isArray(roles)) {
            return roles.some(role => this.getRoleNames().includes(role));
        }
        return this.getRoleNames().includes(roles);
    }

    hasPermission(permissions) {
        if (Array.isArray(permissions)) {
            return permissions.some(permission =>
                this.getPermissionNames().includes(permission)
            );
        }
        return this.getPermissionNames().includes(permissions);
    }

    /**
     * block the user
     * a call to save is necessary
     */
    block() {
        this.blocked_at = new Date().toISOString();
        return this;
    }

    /**
     * unblock the user
     * a call to save is necessary
     */
    unblock() {
        this.blocked_at = null;
        return this;
    }

    

    /**
     * soft delete user and hydrate
     */
    softDelete() {
        let url = `${this.endpoint()}/delete`;
        return this.request({
            method: "POST",
            url: url,
            data: this
        }).then(response => {
            let self = Object.assign(this, response.data.data || response.data);
            return self;
        });
    }

    /**
     * restore after soft delete
     */
    restore() {
        let url = `${this.endpoint()}/restore`;
        return this.request({
            method: "POST",
            url: url,
            data: this
        }).then(response => {
            let self = Object.assign(this, response.data.data || response.data);
            return self;
        });
    }

    /**
     * destroy permanently user
     */
    delete() {
        let url = `${this.endpoint()}`;
        return this.request({
            method: "DELETE",
            url: url
        });
    }

    updateAvatar(formData) {
        return this.request({
            method: "POST",
            url: `${this.endpoint()}/avatar`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            let self = Object.assign(this, response.data.data);
            return self;
        });
    }

    deleteAvatar() {
        return this.request({
            method: "DELETE",
            url: `${this.endpoint()}/avatar`
        });
    }

    updatePassword(data) {
        return this.request({
            method: "PUT",
            url: `${this.endpoint()}/password`,
            data: data
        });
    }

    sendEmailVerification() {
        return this.request({
            method: "POST",
            url: `${this.endpoint()}/send-email-verification`,
            data: this
        }).then(response => {
            let self = Object.assign(this, response.data);
            return self;
        });
    }
}
