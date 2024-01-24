function Form({form, setForm}) {

    return(<>
    <form>
        <label>
          username:
          <input
            name="username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="text"
          />
        </label>
        <label>
          password:
          <input
            name="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type="text"
          />
        </label>
        <button type="submit">SUBMIT</button>
      </form>
    </>)
}

export { Form }