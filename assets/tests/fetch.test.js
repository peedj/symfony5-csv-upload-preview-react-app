// user.test.js

import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import CsvList from "../components/CsvList";
import axios from "axios";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    try {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    } catch (e) {

    }
});

it("renders user data", async () => {
    const fakeData = {
        data: {
            items: [{
                id: "user-123",
                fileName: "Csv File.csv",
            }],
            atall: 1
        }
    };
    jest.spyOn(axios, "get").mockImplementation(
        () =>
            Promise.resolve(fakeData)
    );
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<CsvList id="123"/>, container);
    });
    expect(container.querySelector("#user-123 .filename").textContent).toBe(fakeData.data.items[0].fileName);
    // remove the mock to ensure tests are completely isolated
    axios.get.mockRestore();
});