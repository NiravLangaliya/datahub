/**
 * Describes module interfaces in the third party library tildeio/router.js
 * until types are published publicly
 * @module tildeio/router.js
 */

import Route from '@ember/routing/route';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface RouteInfo {
  readonly name: string;
  readonly parent: RouteInfo | RouteInfoWithAttributes | null;
  readonly child: RouteInfo | RouteInfoWithAttributes | null;
  readonly localName: string;
  readonly params: Record<string, unknown>;
  readonly paramNames: Array<string>;
  readonly queryParams: Record<string, unknown>;
  readonly metadata: unknown;
  find(predicate: (this: any, routeInfo: RouteInfo, i: number) => boolean, thisArg?: any): RouteInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface RouteInfoWithAttributes extends RouteInfo {
  attributes: any;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface SerializerFunc {
  (model: {}, params: Array<string>): unknown;
}

export declare type OnRejected<T, TResult2> = ((reason: T) => TResult2 | PromiseLike<TResult2>) | undefined | null;
export declare const PARAMS_SYMBOL = '__PARAMS__-261986232992830203-23323';
export declare const QUERY_PARAMS_SYMBOL = '__QPS__-2619863929824844-32323';
/**
  A Transition is a thennable (a promise-like object) that represents
  an attempt to transition to another route. It can be aborted, either
  explicitly via `abort` or by attempting another transition while a
  previous one is still underway. An aborted transition can also
  be `retry()`d later.

  @class Transition
  @constructor
  @param {object} router
  @param {object} intent
  @param {object} state
  @param {object} error
  @private
 */
export default class Transition<T extends Route> implements Partial<Promise<T>> {
  from: RouteInfoWithAttributes | null | undefined;
  to?: RouteInfo | RouteInfoWithAttributes | null;
  router: Router<T>;
  data: Record<string, unknown>;
  intent: unknown;
  resolvedModels: Record<string, Record<string, unknown>>;
  [QUERY_PARAMS_SYMBOL]: Record<string, unknown>;
  promise?: Promise<any>;
  error: Error | null | undefined;
  [PARAMS_SYMBOL]: Record<string, unknown>;
  routeInfos: Array<RouteInfo>;
  targetName: string | null | undefined;
  pivotHandler: Route | null | undefined;
  sequence: number;
  isAborted: boolean;
  isActive: boolean;
  urlMethod: string | null;
  resolveIndex: number;
  queryParamsOnly: boolean;
  isTransition: boolean;
  isCausedByAbortingTransition: boolean;
  isCausedByInitialTransition: boolean;
  isCausedByAbortingReplaceTransition: boolean;
  /**
      The Transition's internal promise. Calling `.then` on this property
      is that same as calling `.then` on the Transition object itself, but
      this property is exposed for when you want to pass around a
      Transition's promise, but not the Transition object itself, since
      Transition object can be externally `abort`ed, while the promise
      cannot.

      @property promise
      @type {object}
      @public
     */
  /**
      Custom state can be stored on a Transition's `data` object.
      This can be useful for decorating a Transition within an earlier
      hook and shared with a later hook. Properties set on `data` will
      be copied to new transitions generated by calling `retry` on this
      transition.

      @property data
      @type {object}
      @public
     */
  /**
      A standard promise hook that resolves if the transition
      succeeds and rejects if it fails/redirects/aborts.

      Forwards to the internal `promise` property which you can
      use in situations where you want to pass around a thennable,
      but not the Transition itself.

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      @param {string} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
      @public
     */
  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    label?: string
  ): Promise<TResult1 | TResult2>;
  /**

      Forwards to the internal `promise` property which you can
      use in situations where you want to pass around a thennable,
      but not the Transition itself.

      @method catch
      @param {Function} onRejection
      @param {string} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
      @public
     */
  catch<T>(onRejection?: OnRejected<unknown, T>, label?: string): any;
  /**

      Forwards to the internal `promise` property which you can
      use in situations where you want to pass around a thennable,
      but not the Transition itself.

      @method finally
      @param {Function} callback
      @param {string} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
      @public
     */
  finally<T>(callback?: T | undefined, label?: string): any;
  /**
      Aborts the Transition. Note you can also implicitly abort a transition
      by initiating another transition while a previous one is underway.

      @method abort
      @return {Transition} this transition
      @public
     */
  abort(): this;
  rollback(): void;
  redirect(newTransition: Transition<T>): void;
  /**

      Retries a previously-aborted transition (making sure to abort the
      transition if it's still active). Returns a new transition that
      represents the new attempt to transition.

      @method retry
      @return {Transition} new transition
      @public
     */
  retry(): Transition<T>;
  /**

      Sets the URL-changing method to be employed at the end of a
      successful transition. By default, a new Transition will just
      use `updateURL`, but passing 'replace' to this method will
      cause the URL to update using 'replaceWith' instead. Omitting
      a parameter will disable the URL change, allowing for transitions
      that don't update the URL at completion (this is also used for
      handleURL, since the URL has already changed before the
      transition took place).

      @method method
      @param {string} method the type of URL-changing method to use
        at the end of a transition. Accepted values are 'replace',
        falsy values, or any other non-falsy value (which is
        interpreted as an updateURL transition).

      @return {Transition} this transition
      @public
     */
  method(method: string | null): this;
  send(ignoreFailure: boolean, _name: string, err?: Error, transition?: Transition<T>, handler?: Route): void;
  /**

      Fires an event on the current list of resolved/resolving
      handlers within this transition. Useful for firing events
      on route hierarchies that haven't fully been entered yet.

      Note: This method is also aliased as `send`

      @method trigger
      @param {Boolean} [ignoreFailure=false] a boolean specifying whether unhandled events throw an error
      @param {string} name the name of the event to fire
      @public
     */
  trigger(ignoreFailure: boolean, name: string, ...args: Array<any>): void;
  /**
      Transitions are aborted and their promises rejected
      when redirects occur; this method returns a promise
      that will follow any redirects that occur and fulfill
      with the value fulfilled by any redirecting transitions
      that occur.

      @method followRedirects
      @return {Promise} a promise that fulfills with the same
        value that the final redirecting transition fulfills with
      @public
     */
  followRedirects(): Promise<T>;
  toString(): string;
  /**
      @private
     */
  log(message: string): void;
}

export abstract class Router<T extends Route> {
  log?: (message: string) => void;
  state?: unknown;
  oldState: unknown | null | undefined;
  activeTransition?: Transition<T>;
  currentRouteInfos?: Array<RouteInfo>;
  currentSequence: number;
  recognizer: unknown;
  constructor(logger?: (message: string) => void);
  abstract getRoute(name: string): T | Promise<T>;
  abstract getSerializer(name: string): SerializerFunc | undefined;
  abstract updateURL(url: string): void;
  abstract replaceURL(url: string): void;
  abstract willTransition(
    oldRouteInfos: Array<RouteInfo>,
    newRouteInfos: Array<RouteInfo>,
    transition: Transition<T>
  ): void;
  abstract didTransition(routeInfos: Array<RouteInfo>): void;
  abstract triggerEvent(routeInfos: Array<RouteInfo>, ignoreFailure: boolean, name: string, args: Array<unknown>): void;
  abstract routeWillChange(transition: Transition<T>): void;
  abstract routeDidChange(transition: Transition<T>): void;
  abstract transitionDidError(error: unknown, transition: Transition<T>): Transition<T> | Error;
  /**
      The main entry point into the router. The API is essentially
      the same as the `map` method in `route-recognizer`.

      This method extracts the String handler at the last `.to()`
      call and uses it as the name of the whole route.

      @param {Function} callback
    */
  map(callback: unknown): void;
  hasRoute(route: string): any;
  queryParamsTransition: unknown;
  transitionByIntent: unknown;
  recognize(url: string): RouteInfo | null;
  recognizeAndLoad(url: string): Promise<RouteInfoWithAttributes>;
  private generateNewState;
  private getTransitionByIntent;
  /**
    @private

    Begins and returns a Transition based on the provided
    arguments. Accepts arguments in the form of both URL
    transitions and named transitions.

    @param {Router} router
    @param {Array[Object]} args arguments passed to transitionTo,
      replaceWith, or handleURL
  */
  private doTransition;
  /**
    @private

    Updates the URL (if necessary) and calls `setupContexts`
    to update the router's array of `currentRouteInfos`.
   */
  private finalizeTransition;
  /**
    @private

    Takes an Array of `RouteInfo`s, figures out which ones are
    exiting, entering, or changing contexts, and calls the
    proper route hooks.

    For example, consider the following tree of routes. Each route is
    followed by the URL segment it handles.

    ```
    |~index ("/")
    | |~posts ("/posts")
    | | |-showPost ("/:id")
    | | |-newPost ("/new")
    | | |-editPost ("/edit")
    | |~about ("/about/:id")
    ```

    Consider the following transitions:

    1. A URL transition to `/posts/1`.
       1. Triggers the `*model` callbacks on the
          `index`, `posts`, and `showPost` routes
       2. Triggers the `enter` callback on the same
       3. Triggers the `setup` callback on the same
    2. A direct transition to `newPost`
       1. Triggers the `exit` callback on `showPost`
       2. Triggers the `enter` callback on `newPost`
       3. Triggers the `setup` callback on `newPost`
    3. A direct transition to `about` with a specified
       context object
       1. Triggers the `exit` callback on `newPost`
          and `posts`
       2. Triggers the `serialize` callback on `about`
       3. Triggers the `enter` callback on `about`
       4. Triggers the `setup` callback on `about`

    @param {Router} transition
    @param {TransitionState} newState
  */
  private setupContexts;
  /**
    @private

    Fires queryParamsDidChange event
  */
  private fireQueryParamDidChange;
  /**
    @private

    Helper method used by setupContexts. Handles errors or redirects
    that may happen in enter/setup.
  */
  private routeEnteredOrUpdated;
  /**
    @private

    This function is called when transitioning from one URL to
    another to determine which routes are no longer active,
    which routes are newly active, and which routes remain
    active but have their context changed.

    Take a list of old routes and new routes and partition
    them into four buckets:

    * unchanged: the route was active in both the old and
      new URL, and its context remains the same
    * updated context: the route was active in both the
      old and new URL, but its context changed. The route's
      `setup` method, if any, will be called with the new
      context.
    * exited: the route was active in the old URL, but is
      no longer active.
    * entered: the route was not active in the old URL, but
      is now active.

    The PartitionedRoutes structure has four fields:

    * `updatedContext`: a list of `RouteInfo` objects that
      represent routes that remain active but have a changed
      context
    * `entered`: a list of `RouteInfo` objects that represent
      routes that are newly active
    * `exited`: a list of `RouteInfo` objects that are no
      longer active.
    * `unchanged`: a list of `RouteInfo` objects that remain active.

    @param {Array[InternalRouteInfo]} oldRoutes a list of the route
      information for the previous URL (or `[]` if this is the
      first handled transition)
    @param {Array[InternalRouteInfo]} newRoutes a list of the route
      information for the new URL

    @return {Partition}
  */
  private partitionRoutes;
  private _updateURL;
  private finalizeQueryParamChange;
  private toReadOnlyInfos;
  private fromInfos;
  private notifyExistingHandlers;
  /**
      Clears the current and target route routes and triggers exit
      on each of them starting at the leaf and traversing up through
      its ancestors.
    */
  reset(): void;
  /**
      let handler = routeInfo.handler;
      The entry point for handling a change to the URL (usually
      via the back and forward button).

      Returns an Array of handlers and the parameters associated
      with those parameters.

      @param {string} url a URL to process

      @return {Array} an Array of `[handler, parameter]` tuples
    */
  handleURL(url: string): unknown;
  /**
      Transition into the specified named route.

      If necessary, trigger the exit callback on any routes
      that are no longer represented by the target route.

      @param {string} name the name of the route
    */
  transitionTo(
    name:
      | string
      | {
          queryParams: Record<string, unknown>;
        },
    ...contexts: Array<any>
  ): Transition<T>;
  intermediateTransitionTo(name: string, ...args: Array<any>): unknown;
  refresh(pivotRoute?: T): unknown;
  /**
      Identical to `transitionTo` except that the current URL will be replaced
      if possible.

      This method is intended primarily for use with `replaceState`.

      @param {string} name the name of the route
    */
  replaceWith(name: string): unknown;
  /**
      Take a named route and context objects and generate a
      URL.

      @param {string} name the name of the route to generate
        a URL for
      @param {...object} objects a list of objects to serialize

      @return {string} a URL
    */
  generate(routeName: string, ...args: Array<any>): any;
  applyIntent(routeName: string, contexts: Array<Record<string, unknown>>): unknown;
  isActiveIntent(
    routeName: string,
    contexts: Array<any>,
    queryParams?: Record<string, unknown>,
    _state?: unknown
  ): boolean;
  isActive(routeName: string, ...args: Array<unknown>): boolean;
  trigger(name: string, ...args: Array<any>): void;
}