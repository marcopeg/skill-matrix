describe("Ping", () => {
  beforeEach(global.reset);

  it("should be able to run a ping", async () => {
    const res = await global.post("/evt/ping");
    expect(res).toHaveProperty("message", "ok");
    expect(res).toHaveProperty("timestamp");
  });
});
