/**
 * JSON API Response
 *
 * This follows the JSON API Specification: http://jsonapi.org/format/
 */

import { isString } from 'lodash';

// -----------------------------------------------------------------------------
// CONTRACTS
// -----------------------------------------------------------------------------

/**
 * @see http://jsonapi.org/format/#document-top-level
 */
export interface JsonApiResponseInterface {
  // ---------------------------------------------------------------------------
  // A document MUST contain at least one of the following top-level members:
  // ...The members data and errors MUST NOT coexist in the same document.
  /**
   * @var data any
   * The document's "primary data"
   */
  data?: any;
  /**
   * @var errors Array<JsonApiResponseErrorInterface>
   * An array of error objects
   */
  errors?: Array<JsonApiResponseErrorInterface>;
  /**
   * @var meta any
   * A meta object that contains non-standard meta-information.
   */
  meta?: any;
  // ---------------------------------------------------------------------------
  // A document MAY contain any of these top-level members:
  /**
   * @var jsonapi any
   * an object describing the server's implementation
   */
  jsonapi?: any;
  /**
   * @var links { [name: string]: string | JsonApiResponseLinkInterface }
   * A links object related to the primary data.
   */
  links?: {
    // Each member of a links object is a "link". A link MUST be represented as either:
    // a string containing the link's URL or an object ("link object").
    // The top-level links object MAY contain the following members:
    /**
     * @var self any
     * The link that generated the current response document.
     */
    self?: string | JsonApiResponseLinkInterface;
    /**
     * @var related any
     * A related resource link when the primary data represents a resource relationship.
     */
    related?: string | JsonApiResponseLinkInterface;
  };
  /**
   * @var included { [name: string]: JsonApiResponseResourceObjectInterface }
   * An array of resource objects that are related to the primary data and/or each other ("included resources").
   * If a document does not contain a top-level data key, the included member MUST NOT be present either.
   */
  included?: { [name: string]: JsonApiResponseResourceObjectInterface };
}

export interface JsonApiResponseErrorInterface {
  // An error object MAY have the following members:
  /**
   * @var id string | number
   * a unique identifier for this particular occurrence of the problem.
   */
  id?: string | number;
  /**
   * @var links { [name: string]: string | JsonApiResponseLinkInterface }
   * a links object containing the following members:
   * - 'about': a link that leads to further details about this particular occurrence of the problem.
   */
  links?: { [name: string]: string | JsonApiResponseLinkInterface };
  /**
   * @var status string
   * the HTTP status code applicable to this problem, expressed as a string value.
   */
  status?: string;
  /**
   * @var code string
   * an application-specific error code, expressed as a string value.
   */
  code?: string;
  /**
   * @var title string
   * a short, human-readable summary of the problem that SHOULD NOT change from
   * occurrence to occurrence of the problem, except for purposes of localization.
   */
  title?: string;
  /**
   * @var detail string
   * a human-readable explanation specific to this occurrence of the problem.
   * Like title, this field's value can be localized.
   */
  detail?: string;
  /**
   * @var source any
   * an object containing references to the source of the error,
   * optionally including any of the following members:
   *   - pointer
   *   - parameter
   */
  source?: {
    /**
     * @var pointer string
     * a JSON Pointer [RFC6901] to the associated entity in the request document
     * [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
     */
    pointer?: string,
    /**
     * @var parameter string
     * a string indicating which URI query parameter caused the error.
     */
    parameter?: string
  };
  /**
   * @var meta any
   * a meta object containing non-standard meta-information about the error.
   */
  meta?: any;
}

/**
 * @see http://jsonapi.org/format/#document-links
 */
export interface JsonApiResponseLinkInterface {
  /**
   * @var href string
   * a string containing the link's URL.
   */
  href?: string;
  /**
   * @var meta any
   * a meta object containing non-standard meta-information about the link.
   */
  meta?: any;
}

/**
 * @see http://jsonapi.org/format/#document-resource-objects
 */
export interface JsonApiResponseResourceObjectInterface {
  // ---------------------------------------------------------------------------
  // A resource object MUST contain at least the following top-level members:
  /**
   * @var id string | number
   * Exception: The `id` member is not required when the resource object originates
   *   at the client and represents a new resource to be created on the server.
   */
  id?: string | number;
  /**
   * @var type string
   */
  type?: string;
  // ---------------------------------------------------------------------------
  // In addition, a resource object MAY contain any of these top-level members:
  // A resource object's attributes and its relationships are collectively called its "fields".
  // Fields for a resource object MUST share a common namespace with each other and with `type` and `id`.
  // In other words, a resource can not have an attribute and relationship with
  //   the same name, nor can it have an `attribute` or `relationship` named `type` or `id`.
  /**
   * @var attributes any
   * An `attributes` object representing some of the resource's data.
   * Members of the `attributes` object represent information about
   *   the resource object in which it's defined.
   * Attributes may contain any valid JSON value.
   * Complex data structures involving JSON objects and arrays are allowed
   *   as attribute values. However, any object that constitutes or is contained
   *   in an attribute MUST NOT contain a relationships or links member, as those
   *   members are reserved by this specification for future use.
   */
  attributes?: any;
  /**
   * @var relationships { [name: string]: JsonApiResponseRelationshipInterface }
   * A `relationships` object describing relationships between
   *   the resource and other JSON API resources.
   * The value of the relationships key MUST be a Relationship object.
   * Members of the relationships object ("relationships") represent references
   *   from the resource object in which it’s defined to other resource objects.
   * Relationships may be to-one or to-many.
   */
  relationships?: { [name: string]: JsonApiResponseRelationshipInterface };
  /**
   * @var links any
   * A `links` object containing links related to the resource.
   */
  links?: { [name: string]: string | JsonApiResponseLinkInterface };
  /**
   * @var meta any
   * A `meta` object containing non-standard meta-information about
   *   a resource that can not be represented as an attribute or relationship.
   */
  meta?: any;
}

/**
 * @see http://jsonapi.org/format/#document-resource-object-relationships
 */
export interface JsonApiResponseRelationshipInterface {
  // A "relationship object" MUST contain at least one of the following:
  /**
   * @var links any
   * A links object containing at least one of the following:
   */
  links?: { [name: string]: string | JsonApiResponseLinkInterface };
  /**
   * @var self any
   * A link for the relationship itself (a "relationship link").
   * This link allows the client to directly manipulate the relationship. For example, removing
   *   an author through an article’s relationship URL would disconnect the person from the article
   *   without deleting the people resource itself. When fetched successfully, this link returns
   *   the linkage for the related resources as its primary data. (See Fetching Relationships.)
   */
  self?: any;
  /**
   * @var related any
   * A related resource link
   */
  related?: any;
  /**
   * @var data any
   * Resource linkage
   */
  data?: any;
  /**
   * @var meta any
   * A meta object that contains non-standard meta-information about the relationship.
   */
  meta?: any;
}

// -----------------------------------------------------------------------------
// CLASSES
// -----------------------------------------------------------------------------

/**
 * Abstract class for all objects
 * Provides an `assignValues` method to populate object keys/values.
 */
export abstract class BaseObject {

  // constructor(obj: {} | Object) {
  //   // this.assignValues(obj);
  // }

  /**
   * Assign Object Property Values
   * @param obj Any object that meets contract/interface requirements
   */
  assignValues(obj: {} | Object) {
    for (const key of Object.keys(obj)) {
      if (key in this) this[key] = obj[key];
    }
  }

}

/**
 * Abstract class for all objects with a `links` property
 * Provides a get/set methods for `links` property to populate object keys/values.
 */
export abstract class BaseObjectWithLinks extends BaseObject {

  get links(): { [name: string]: string | JsonApiResponseLinkInterface } {
    return this.links;
  }

  set links(arg: { [name: string]: string | JsonApiResponseLinkInterface }) {
    if (isString(arg)) {
      this.links = arg;
    } else {
      this.links = arg;
      for (const key of Object.keys(arg)) {
        this.links[key] = new JsonApiResponseLink(arg[key]);
      }
    }
  }

}

/**
 * JSON API Response object
 * @see http://jsonapi.org/format/#document-top-level
 * @param obj Object compliant to JSON API Response Top Level specification
 */
export class JsonApiResponse extends BaseObjectWithLinks implements JsonApiResponseInterface {

  data?: any = undefined;
  meta?: any = undefined;
  jsonapi?: any = undefined;

  constructor(obj: {} | Object) {
    super();
    this.assignValues(obj);
  }

  get errors(): Array<JsonApiResponseErrorInterface> {
    return this.errors;
  }

  set errors(arg: Array<JsonApiResponseErrorInterface>) {
    if (this.errors === undefined) this.errors = [];
    this.errors.push(new JsonApiResponseError(arg));
  }

  get included(): { [name: string]: JsonApiResponseResourceObjectInterface } {
    return this.included;
  }

  set included(arg: { [name: string]: JsonApiResponseResourceObjectInterface }) {
    for (const key of Object.keys(arg)) {
      this.included[key] = new JsonApiResponseResourceObject(arg[key]);
    }
  }

}

/**
 * JSON API Response Error object
 * @see http://jsonapi.org/format/#errors
 * @param obj Object compliant to JSON API Response Error specification
 */
export class JsonApiResponseError extends BaseObjectWithLinks implements JsonApiResponseErrorInterface {

  id?: string | number = undefined;
  status?: string = undefined;
  code?: string = undefined;
  title?: string = undefined;
  detail?: string = undefined;
  source?: any = undefined;
  meta?: any = undefined;

  constructor(obj: {} | Object) {
    super();
    this.assignValues(obj);
  }

}

export class JsonApiResponseLink extends BaseObject implements JsonApiResponseLinkInterface {

  href?: string = undefined;
  meta?: any = undefined;

  constructor(obj: {} | Object) {
    super();
    this.assignValues(obj);
  }

}

export class JsonApiResponseResourceObject extends BaseObjectWithLinks implements JsonApiResponseResourceObjectInterface {

  id?: string | number = undefined;
  type?: string = undefined;
  attributes?: any = undefined;
  meta?: any = undefined;

  constructor(obj: {} | Object) {
    super();
    this.assignValues(obj);
  }

  get relationships(): { [name: string]: JsonApiResponseRelationshipInterface } {
    return this.relationships;
  }

  set relationships(arg: { [name: string]: JsonApiResponseRelationshipInterface }) {
    for (const key of Object.keys(arg)) {
      this.relationships[key] = new JsonApiResponseResourceObject(arg[key]);
    }
  }

}

export class JsonApiResponseRelationship extends BaseObjectWithLinks implements JsonApiResponseRelationshipInterface {

  self?: any = undefined;
  related?: any = undefined;
  data?: any = undefined;
  meta?: any = undefined;

  constructor(obj: {} | Object) {
    super();
    this.assignValues(obj);
  }

}
