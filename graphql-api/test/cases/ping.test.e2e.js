describe("Ping", () => {
  beforeEach(global.reset);

  it("should be able to run a ping", async () => {
    const res = await global.post("/graphql", {
      query: `
        query Ping { 
          ping { 
            message 
            timestamp
          } 
        }
      `
    });
    expect(res.data.ping).toHaveProperty("message", "+ok");
    expect(res.data.ping).toHaveProperty("timestamp");
  });
});
