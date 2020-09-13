const slice = jest.genMockFromModule<any>("../currentUserSlice");

slice.login.mockImplementation(() => new Promise(() => {}));
slice.register.mockImplementation(() => new Promise(() => {}));
slice.logout.mockImplementation(() => new Promise(() => {}));

module.exports = slice;
