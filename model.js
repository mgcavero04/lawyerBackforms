$(document).ready(function() {
  // Mock Backbone.sync
  Backbone.sync = function(method, model, options) {
    var deferred = $.Deferred();
    deferred.resolve(model.toJSON());
    return deferred.promise();
  };

  // Backform example - a person model with a nested address object
  var person = window.person = new Backbone.Model({
    id: 101,
    salutation: "Mr",
    firstName: "*First and last name here",
    lastName: "Jones",
	prisionerID: "*Prisioner ID",
    adult: true,
    address: {
      address1: "1751 rue Richardson",
      address2: "Suite 3.105",
      city: "Montréal",
      postalCode: "H3K 1G6",
      province: "select"
    },
	released:"2040",
	earlyRelease: true,
    dateOfBirth: "1990-10-10",
	moreDetails: "More details on early release",
    why: "",
	contactName:"*Contact name:",
	contactPhone:"*Phone",
	contactEmail:"*Email",
	contactCall:"10:00-14:00",
    jsonValue: null
  });

  new Backform.Form({
    el: "#form",
    model: person,
    fields: [
      {name: "id", label: "Id", control: "uneditable-input"},
      {name: "firstName", label: "First Name", control: "input"},
      {name: "lastName", label: "Last Name", control: "input"},
      {name: "adult", label: "Adult", control: "checkbox"},
      {
        name: "salutation",
        label: "Salutation",
        control: "radio",
        options: [
          {label: "Mr.", value: "Mr"},
          {label: "Mrs.", value: "Mrs"},
          {label: "Mme.", value: "Mme"}
        ]
      },
      {control: "spacer"},
      {name: "address.address1", label: "Address1", control: "input"},
      {name: "address.address2", label: "Address2", control: "input"},
      {name: "address.city", label: "City", control: "input"},
      {name: "address.postalCode", label: "Postal Code", control: "input"},
      {
        name: "address.province",
        label: "Province",
        control: "select",
        options: [
          {label: "Alabama", value: "AL"},
          {label: "Alaska", value: "AK"},
          {label: "Arizona", value: "AZ"},
          {label: "Arkansas", value: "AR"},
          {label: "California", value: "CA"},
          {label: "Colorado", value: "CO"},
          {label: "Connecticut", value: "CT"},
          {label: "Delaware", value: "DE"},
          {label: "Florida", value: "FL"},
          {label: "Georgia", value: "GA"},
          {label: "Hawaii", value: "HI"},
          {label: "Idaho", value: "ID"},
          {label: "Illinois", value: "IL"}
        ]
      },
      {name: "dateOfBirth", label: "Date of birth", control: "datepicker", options: {format: "yyyy-mm-dd"}},
      {name: "lifeGoal", label: "Life goal", control: "textarea", extraClasses: ["fancy"], helpMessage: "Be creative!"},
      {
        name: "jsonValue",
        label: "JSON value",
        control: "select",
        options: [
          {label: "null", value: null},
          {label: "true", value: true},
          {label: "false", value: false},
          {label: "0", value: 0},
          {label: "1", value: 1},
          {label: "99", value: 99},
          {label: "a string", value: "a string"}
        ]
      },
      {control: "button", label: "Save to server"}
    ],
    events: {
      "submit": function(e) {
        e.preventDefault();
        this.model.save().done(function(result) {
          console.log(result);
          alert("Form saved to server!");
        });
        return false;
      }
    }
  }).render();
  
  new Backform.Form({
    el: "#formEligibility",
    model: person,
    fields: [
      {name: "id", label: "", control: "uneditable-input"},
      {name: "firstName", label: "", control: "input"},
      
      {
        name: "salutation",
        label: "",
        control: "radio",
        options: [
          {label: "Federal prisoner", value: "federal"},
		  {label: "State prisoner", value: "state"}
		  ]},
		  
		  {
			name: "prisionerID",
			label: "",
			control: Backform.InputControl.extend({
			initialize: function() 
			{
			  	Backform.InputControl.prototype.initialize.apply(this, arguments);
			    this.listenTo(this.model, "change:toggle", this.render);
        	},
		
         render: function() 
		 {
          if (this.model.get("toggle"))
            	return Backform.InputControl.prototype.render.apply(this, arguments);
		  else
			return Backform.InputControl.prototype.render.apply(this, arguments);
          this.$el.empty();
          return this;
        }
      })
    }
		  
        ,
	  {
  
        name: "address.province",
        label: "",
        control: "select",
        options: [
			{label: "Select State", value: "select"},
          {label: "Alabama", value: "AL"},
          {label: "Alaska", value: "AK"},
          {label: "Arizona", value: "AZ"},
          {label: "Arkansas", value: "AR"},
          {label: "California", value: "CA"},
          {label: "Colorado", value: "CO"},
          {label: "Connecticut", value: "CT"},
          {label: "Delaware", value: "DE"},
          {label: "Florida", value: "FL"},
          {label: "Georgia", value: "GA"},
          {label: "Hawaii", value: "HI"},
          {label: "Idaho", value: "ID"},
          {label: "Illinois", value: "IL"}
		  ]
	  }
     ,
     {control: "button", label: "GO!"}
    ],
    events: {
      "submit": function(e) {
        e.preventDefault();
        this.model.save().done(function(result) {
			//Aqui se graba a la consola!
          console.log(result);
          alert("Form saved to server!");
        });
        return false;
      }
    }
  }).render();
  person.on("change", function() {
    $("#object").text(JSON.stringify(person.toJSON(), null, 2));
	
  }).trigger("change");
  
 new Backform.Form({
    el: "#moreInfo",
    model: person,
    fields: [
      {name: "id", label: "Id", control: "uneditable-input"},
	  {name: "earlyRelease", label:"Have early release requested been submitted?", control:
	  "select",
        options: [
			{label: "Yes", value: "Yes"},
          {label: "No", value: "No"}
		  ]
	  },
      {name: "released", label: "When will the prisoner be released?(YEAR):", control: "select",
        options: [
			{label: "2040", value: "2040"},
          {label: "2041", value: "2041"},
          {label: "2042", value: "2042"},
          {label: "2043", value: "2043"},
          {label: "2044", value: "2044"},
          {label: "2045", value: "2045"},
          {label: "2046", value: "2046"},
          {label: "2047", value: "2047"},
          {label: "2048", value: "2048"},
          {label: "2049", value: "2049"},
          {label: "2050", value: "2050"},
          ]
	  },
      {name: "moreDetails", label: "If requested, please provide some details:", control: "textarea"},
      {name: "why", label: "Please explain why you believe the person deserves an early release:", control: "textarea", extraClasses: ["fancy"]},
      {control: "button", label: "Submit"}
    ],
    events: {
      "submit": function(e) {
        e.preventDefault();
        this.model.save().done(function(result) {
          console.log(result);
          alert("Form saved to server!");
        });
        return false;
      }
    }
  }).render();



  // Example with question
  window.f = new Backform.Form({
    el: $("#form-question"),
    model: new Backbone.Model({toggle: false, years:0}),
    fields: [
	{
      name: "toggle",
      label: "",
      control: "radio",
      options: [{label: "Federal prisioner", value: true}, 
	  			{label: "State prisoner", value: false}
				]}, 
				{
				  name: "",
				  label: "",
				  control: Backform.InputControl.extend({
					initialize: function() 
					{
						
						
					  	Backform.InputControl.prototype.initialize.apply(this, arguments);
					  this.listenTo(this.model, "change:toggle", this.render);
        			},
		
         render: function() 
		 {
          if (this.model.get("toggle"))
            	return Backform.InputControl.prototype.render.apply(this, arguments);
		  else
			return Backform.SelectControl.prototype.render.apply(this, arguments);
          this.$el.empty();
          return this;
        }
      })
    }]
  }).render();

  // Example with input of type email
  new Backform.Form({
    el: $("#form-email"),
    model: new Backbone.Model({email: "jonsnow@castlebla.ck", age:20}),
    fields: [{
      name: "email",
      label: "Email",
      control: "input",
      type: "email",
      required: true
    }, {
      name: "age",
      label: "Age",
      control: "input",
      type: "number",
      required: true
    }, {
      control: "button"
    }]
  }).render();

  $("#form-email").on("submit", function(e) {
    alert("Browser validation passed");
    return false;
  });
  
  //contactDetails:
  new Backform.Form({
    el: $("#contactDetails"),
    model: person,
    fields: [
      {name: "contactName", label: "", control: "input"},
	  {name: "contactPhone", label: "", control: "input"},
	  {name: "contactEmail", label: "", control: "input"},
	  {name: "contactCall", label: "When to call:", control: "select",
        options: [
			{label: "10:00-14:00", value: "10:00-14:00"},
          {label: "15:00-20:00", value: "15:00-20:00"},
          {label: "21:00-24:00", value: "21:00-24:00"}
         ]
	  },
	
	{
      control: "button", label: "Please contact me!"
    }]
  }).render();

  $("#contactDetails").on("submit", function(e) {
    alert("Browser validation passed");
    return false;
  });

  // Example with deeply nested objects
  var personAndFamily = new Backbone.Model({
    "firstName": "Andre",
    "lastName": "Jones",
    "relatives": {
      "mother": {
        "firstName": "Elizabeth",
        "lastName": "Jones"
      },
      "father": {
        "firstName": "Douglas",
        "lastName": "Jones"
      }
    }
  });

  new Backform.Form({
    el: "#form-nested",
    model: personAndFamily,
    fields: [
      {name: "firstName", label: "First Name", control: "input"},
      {name: "lastName", label: "Last Name", control: "input"},
      {
        name: "relatives.mother.firstName",
        label: "Mother's First Name",
        control: "input",
      }, {
        name: "relatives.mother.lastName",
        label: "Mother's Last Name",
        control: "input",
      }, {
        name: "relatives.father.firstName",
        label: "Father's First Name",
        control: "input",
      }, {
        name: "relatives.father.lastName",
        label: "Father's Last Name",
        control: "input",
      }
    ]
  }).render();

  personAndFamily.on("change", function() {
    $("#nested-object").text(JSON.stringify(personAndFamily.toJSON(), null, 2));
  }).trigger("change");

  // Example with validation
  var MyModel = Backbone.Model.extend({
    defaults: {
      a: null
    },
    validate: function(attributes, options) {
      this.errorModel.clear();

      var number = parseFloat(this.get("a"), 10);
      if (isNaN(number))
        this.errorModel.set({a: "Not a number!"});
      else if (number <= 10 || number >= 20)
        this.errorModel.set({a: "Must be between 10 and 20"});

      if (!_.isEmpty(_.compact(this.errorModel.toJSON())))
        return "Validation errors. Please fix.";
    }
  });

  var form = new Backform.Form({
    el: "#form-validation",
    model: new MyModel(),
    fields: [{
      name: "a",
      label: "Type in a number between 10 and 20. Submit the form to validate.",
      control: "input",
      type: "number"
    }, {
      id: "submit",
      control: "button"
    }]
  }).render();

  form.$el.on("submit", function(e) {
    e.preventDefault();
    var submit = form.fields.get("submit");

    if (form.model.isValid())
      submit.set({status:"success", message: "Success!"});
    else
      submit.set({status:"error", message: form.model.validationError});

    return false;
  });

});
