import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

const Searchable = (props) => {
  const { setIsLoading, setSearchResults, searchTerm, searchValue } = props;

  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            const result = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue
            );
            setSearchResults(result);
          } catch (error) {
            console.error(error, "something broke");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  );
};

const Feature = (props) => {
  const { featuredResult, setIsLoading, setSearchResults } = props;
  if (!featuredResult) {
    return (
      <main id="feature">
        <p></p>
      </main>
    );
  }
  const {
    title,
    dated,
    images,
    primaryimageurl,
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline,
  } = featuredResult;
  return (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">
          {description ? (
            <Fragment>
              <span className="title">Description:</span>
              <span className="content">{description}</span>
            </Fragment>
          ) : null}
          {culture ? (
            <React.Fragment>
              <span className="title">Culture:</span>
              <Searchable
                searchTerm="culture"
                searchValue={culture}
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
              />
            </React.Fragment>
          ) : null}
          {style ? (
            <React.Fragment>
              <span className="title">Style:</span>
              <span className="content">{style}</span>
            </React.Fragment>
          ) : null}

          {technique ? (
            <React.Fragment>
              <span className="title">Technique:</span>
              <Searchable
                searchTerm="technique"
                searchValue={technique}
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
              />
            </React.Fragment>
          ) : null}

          {medium ? (
            <React.Fragment>
              <span className="title">Medium:</span>
              <Searchable
                searchTerm="medium"
                searchValue={medium.toLowerCase()}
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
              />
            </React.Fragment>
          ) : null}

          {dimensions ? (
            <React.Fragment>
              <span className="title">Dimensions:</span>
              <span className="content">{dimensions}</span>
            </React.Fragment>
          ) : null}

          {people && people.length
            ? people.map((person, idx) => {
                return (
                  <React.Fragment key={`person-${person.role}${idx}`}>
                    <span className="title">People:</span>
                    <Searchable
                      
                      searchTerm="person"
                      searchValue={person.displayname}
                      setIsLoading={setIsLoading}
                      setSearchResults={setSearchResults}
                    />
                  </React.Fragment>
                );
              })
            : null}
            {department ? (
            <Fragment>
              <span className="title">Department:</span>
              <span className="content">{department}</span>
            </Fragment>
          ) : null}
          {division ? (
            <Fragment>
              <span className="title">Division:</span>
              <span className="content">{division}</span>
            </Fragment>
          ) : null}
          {contact ? (
            <Fragment>
              <span className="title">Contact:</span>
              <span className="content">
              <a target="_blank" href={`mailto:${contact}`}>{contact}</a></span>
              
            </Fragment>
          ) : null}
          {creditline ? (
            <Fragment>
              <span className="title">Creditline:</span>
              <span className="content">{creditline}</span>
            </Fragment>
          ) : null}

        </section>
        <section className="photos">
          {images && images.length ? (
            images.map((image, idx) => {
              return (
                <img
                  key={`imageurl-${image.baseimageurl}${idx}`}
                  src={image.baseimageurl}
                  alt={image.baseimageurl}
                />
              );
            })
          ) : primaryimageurl ? (
            <img src={primaryimageurl} alt={description} />
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default Feature;
