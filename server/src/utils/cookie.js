

const setAccessTokenCookie = (res, accessToken) => {
    try {
        res.cookie('accessToken', accessToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: false,
            secure : false,
            sameSite: "lax",
            path : "/"
        });
    } catch (error) {
        console.log("Failed to set cookie", error)
        throw error
    }
}

module.exports = {setAccessTokenCookie}