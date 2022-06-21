describe("Ping", () => {
  beforeEach(global.reset);

  it("should be able to run a ping event", async () => {
    const res = await global.post("/evt/ping");
    expect(res).toContain("ok - ");
  });
});
