import React from 'react';

export default function RepoInput(props) {
  function handleSubmit(event) {
    event.preventDefault();

    props.onSubmit(RepoInput.input.value);
  }

  function handleOnChange(event) {
    if (event.currentTarget.value.length === 0) {
      props.onSubmit(false);
    }

    props.onChange(event.currentTarget.value);
  }

  return (
    <form id="repo-form" onSubmit={handleSubmit}>
      <input
        id="repo-form-input"
        onChange={handleOnChange}
        value={props.value}
        type="search"
        ref={ele => RepoInput.input = ele}
        placeholder="Search for repo name"
      />
    </form>
  );
}
