describe("Ping", () => {
  beforeEach(global.reset);

  it("should be able to run a ping", async () => {
    const res = await global.post("/act/ping");
    expect(res).toContain("ok - ");
  });
});
