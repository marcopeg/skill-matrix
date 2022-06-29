describe("testHasuraClient", () => {
  it("shoudl wok", async () => {
    const res = await global.post("/test-hasura-client");
    expect(res).toHaveProperty("ping_action");
  });
});
