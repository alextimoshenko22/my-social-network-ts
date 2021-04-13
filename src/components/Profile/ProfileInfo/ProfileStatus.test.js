import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"Hello dude!"} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Hello dude!");
    });
    test("after creation <span> with status should be displayed", () => {
        const component = create(<ProfileStatus status={"Hello dude!"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"Hello dude!"} />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("after creation <span> with status should contains correct status", () => {
        const component = create(<ProfileStatus status={"Hello dude!"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("Hello dude!");
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"Hello dude!"} />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("Hello dude!") ;
    });
    test("callback should be called", () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status={"Hello dude!"} updateStatus={mockCallBack} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
});