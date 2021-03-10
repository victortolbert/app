<?php
Class Salesforce_model extends CI_Model{

 function get_config($vars=NULL){
	$r['access_token']			= '';
	$r['client_id']					=  '3MVG9zlTNB8o8BA3BS2JfuQaUG5KvzchmEF4BDyiNZjJ5FZTPMS3A.IGtwFowRFqBoJgdJ7RcGTXLBYLT_c8i';
	$r['client_secret']			=  '8515706386669122189';
	$r['redirect_url']			= base_url()."salesforce/oauthcallback";
	$r['login_url']					= "https://login.salesforce.com";
	$r['instance_url']			= 'https://promise686.my.salesforce.com';
	if(!empty($_SESSION['salesforce']['access_token'])){
		$r['access_token']		= $_SESSION['salesforce']['access_token'];	
	}
	
	if(empty($vars['id_salesforce_config'])){
		$vars['id_salesforce_config']		= 1;
	}
	
	$sql = "SELECT * FROM ltp_salesforce_config WHERE `id_salesforce_config` = ".$this->db->escape($vars['id_salesforce_config']);;
	$query = $this->db->query($sql,false);
	
	if($query -> num_rows() > 0){
		$r 	= $query->result_array();
		$r 	= $r[0];
		$arr_check_keys	= array('redirect_url', 'login_url', 'instance_url', 'redirect_uri');
		foreach($arr_check_keys as $key){
			if(!empty($r[$key])){
				$r[$key] 	= correct_img_path($r[$key]);
			}
		}
		$_SESSION['salesforce']		= $r;
	}
	
	return $r;
 }
 
 function oauth_login(){
	 	 
	$config					= $this->get_config();
	$config['login_url']	= 'https://login.salesforce.com/services/oauth2/token';
	
	$params 	= "immediate=true&grant_type=password"
			. "&client_id=" . $config['client_id']
			. "&client_secret=" . $config['client_secret']
			. "&username=" . urlencode($config['login_user'])
			. "&password=" . urlencode($config['login_pass'].$config['access_token'])
			. "&redirect_uri=" . urlencode($config['redirect_url']);

		$curl 	= curl_init($config['login_url']);
		//echo $params;
		curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt ($curl, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $params);


		$json_response 	= curl_exec($curl);
		$status 				= curl_getinfo($curl, CURLINFO_HTTP_CODE);

		if ( $status != 200 ) {
			die("Error: call to token URL ".$config['login_url']." failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
		}

		curl_close($curl);

		$response 			= json_decode($json_response, true);
		print_array($json_response);
 }
  
 
 function show_accounts($instance_url=NULL, $access_token=NULL) {
	 
	$auth 						= $this->get_salesforce_oauth_credentials($instance_url, $access_token);
	 
    $query 	= "SELECT Name, Id, Foster_family_status__c, BillingStreet, BillingCity, BillingState ,BillingPostalCode, RecordTypeId, Type from Account WHERE type = 'Household' LIMIT 1000";
	$query 	= "SELECT Id, Email, FirstName, LastName, MailingStreet, MailingCity, MailingState ,MailingPostalCode, Phone, RecordTypeId, AccountId FROM Contact WHERE AccountID ='0010G000021IUPpQAO' LIMIT 5000";
    $url 		= $auth['instance_url']."/services/data/v20.0/query?q=" . urlencode($query);

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
            array("Authorization: OAuth ".$auth['access_token']));

    $json_response = curl_exec($curl);
    curl_close($curl);

    $response 		= json_decode($json_response, true);
	print_array($json_response);

    $total_size 		= $response['totalSize'];

    echo "$total_size record(s) returned<br/><br/>";
    foreach ((array) $response['records'] as $record) {
        print_array($record);
    }
    echo "<br/>";
}

function curl_call($vars){
	$id 		= null;
	$object = null;
	
	
	
	if(!empty($vars['post_fields']['Id'])){
		$vars['call_type']		= 'patch';
		$id							= $vars['post_fields']['Id'];
		unset($vars['post_fields']['Id']);
	}
	
	if(empty($vars['query']) && !empty($vars['post_fields'])){
		$vars['query']		= json_encode($vars['post_fields']);
	}
	
	if(empty($vars['query'])){
		return null;
	}
	
	if(empty($vars['access_token'])){
		$vars['access_token']	= null;
	}
	
	if(empty($vars['instance_url'])){
		$vars['instance_url']	= null;
	}
	if(empty($vars['call_type'])){
		$vars['call_type'] = null;
	}
	if(!empty($vars['call_object'])){
		$object		= $vars['call_object'];
	}
	
	$auth 				= $this->get_salesforce_oauth_credentials($vars['instance_url'], $vars['access_token']);
	
	if(!empty($vars['nextRecordsUrl']) && strlen($vars['nextRecordsUrl']) > 10){
		$url 					= $auth['instance_url'].$vars['nextRecordsUrl'];
	}elseif(strtolower($vars['call_type']) == 'post' || strtolower($vars['call_type']) == 'patch'){
		
		//check to see if a matching record exists in Salesforce before syncing (prevent SF duplicates)
		if(empty($id) && empty($vars['ignore_duplicates'])){
			switch(strtolower($vars['call_object'])){
					case 'contacts':
					case 'contact':
					case 'people':
					case 'advocate':
					case 'advocates':
					case 'volunteer':
					case 'volunteers':
						if(!empty($vars['post_fields']['FirstName']) && !empty($vars['post_fields']['Email'])){
							$chk_vars['name_first']			= $vars['post_fields']['FirstName'];
							$chk_vars['email']						= $vars['post_fields']['Email'];
							//$chk_vars['debug']					= 1;
							$chk_vars['force_update']		= 1;
							$checks 									= $this->get_contacts($chk_vars);
						
							
							if(!empty($checks['data'][0]['Id'])){
								$id 										= $checks['data'][0]['Id'];
								if(!empty($vars['id_promise_serves'])){
									$this->people_model->save_people(array('id_people' => $vars['id_promise_serves'], 'id_salesforce' => $checks['data'][0]['Id']));
								}
							}
						}

					break;
			}
		}

		$url						= $auth['instance_url'].'/services/data/v42.0/sobjects/'.$object.'/'.$id;
	}else{
		$url 					= $auth['instance_url']."/services/data/v42.0/query?q=" . urlencode($vars['query']);	
	}
	//echo '<br />'.$url;
	//print_array($vars);
	//exit();

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: OAuth ".$auth['access_token'], "Content-type: application/json"));
	if(strtolower($vars['call_type']) == 'post'){
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $vars['query']);	
	}elseif(strtolower($vars['call_type']) == 'patch' ){
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PATCH");
		curl_setopt($curl, CURLOPT_POSTFIELDS, $vars['query']);	
	}
		

    $json_response 			= curl_exec($curl);
	$curl_status					 = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	//echo 'CURL: '.$curl_status;
	//echo $json_response;
    curl_close($curl);
	
	if(empty($json_response)){
		if($curl_status == 204){
			$response['success']	= true;
			if(!empty($id)){
				$response['id']			= $id;
			}
		}
	}else{
		$response						= json_decode($json_response, true);	
	}

	//print_array($response);
	//exit();
	return $response;
	
}

function curl_post($vars){
	if(empty($vars['id_salesforce'])){
		return null;
	}
	
	if(empty($vars['access_token'])){
		$vars['access_token']	= null;
	}
	
	if(empty($vars['instance_url'])){
		$vars['instance_url']	= null;
	}
	
	$auth 						= $this->get_salesforce_oauth_credentials($vars['instance_url'], $vars['access_token']);
	
	//$url 							= $auth['instance_url']."/services/data/v42.0/sobjects/Account/".$vars['id_salesforce'];
	$url 							= $auth['instance_url']."/services/data/v42.0/sobjects/Contact/".$vars['id_salesforce'];
	$sf_fields_map			= $this->get_salesforce_serves_fields_map();
	$sf_fields					= array();
	$sf_fields_bypass		= array('Id');
	
	foreach($sf_fields_map as $key => $val){
		if(isset($vars[$val]) && !in_array($key, $sf_fields_bypass)){
			$sf_fields[$key] = $vars[$val];	
		}
	}
	
	
    $content = json_encode($sf_fields);
	

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
            array("Authorization: OAuth ".$auth['access_token'],
                "Content-type: application/json"));
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PATCH");
    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

    curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ( $status != 204 ) {
        die("Error: call to URL $url failed with status $status, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }

    echo "HTTP status $status updating account<br/><br/>";

    curl_close($curl);
	
}


function get_foster_family_people($vars=NULL, $instance_url=NULL, $access_token=NULL) {
	
	$arr_limiters		= array('account_id', 'name_first', 'name_last', 'last_update');
	$i						= 0;
	
	if(!empty($_SESSION['salesforce_foster_families']['time']) && empty($vars['force_update'])){
		return $_SESSION['salesforce_foster_families'];
	}
	 
	$query 	= "SELECT Id, Email, FirstName, LastName, MailingStreet, MailingCity, MailingState ,MailingPostalCode, Phone, HomePhone, MobilePhone, RecordTypeId, AccountId, Foster_Family_Status__c, Birthdate, SystemModStamp FROM Contact  WHERE IsFosterParent__c = TRUE";
	
	$i =1;
	
	if(!empty($vars)){
		foreach($vars as $key => $val){
			 if(in_array(strtolower($key), $arr_limiters) && $i < 1){
				$query .= " WHERE ";		 
				$i++;
			 }
		}
	}
	
	if(!empty($vars['account_id'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "AccountID ='".$vars['account_id']."'";
		$i++;
	}
	if(!empty($vars['foster_family_status'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Foster_Family_Status__c ='".$vars['foster_family_status']."'";
		$i++;
	}
	if(!empty($vars['name_first'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "FirstName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['name_last'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "LastName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['last_update'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_update'])){
			$vars['last_update']		= $this->convert_unix_to_sf_timestamp($vars['last_update']);
		}
		$query .= "SystemModStamp >= ".$vars['last_update'];
		$i++;
	}

	$records								= array();
	$call['query']							= $query;
	$response['nextRecordsUrl']	= 1;
	
	while(!empty($response['nextRecordsUrl'])){
		$call['nextRecordsUrl']		= $response['nextRecordsUrl'];
		$response							= $this->curl_call($call);
		if(!empty($response[0]['errorCode'])){
			echo '<br /><br />Error Code: '.$response[0]['errorCode'];
			echo '<br /><br />Error message: '.$response[0]['message'];
			return $response[0];
		}else{
			$records							= array_merge($records,$response['records']);	
		}
	}	

	$r['total_records']		= $response['totalSize'];
	$r['time']					= time();
	$r['data']					= $records;
	$r['assoc']					= array();
	
	
	$accounts					= $this->get_accounts();
	//$accounts					= $this->get_accounts(array('force_update' =>1));

	
	if(!empty($records)){
		foreach($records as $cur){
			$cur_id_account											= $cur['AccountId'];
			if(empty($r['assoc'][$cur_id_account]['family']['Id']) && !empty($accounts['assoc'][$cur_id_account]['Id'])){
				$r['assoc'][$cur_id_account]['family']		= $accounts['assoc'][$cur_id_account];	
			}
			if(empty($r['assoc'][$cur_id_account]['Id'])){
				$r['assoc'][$cur_id_account]['people'][]	= $cur;		
			}
		}
	}
	
	$_SESSION['salesforce_foster_families']	= $r;
	
	return $r;
    
}

function get_volunteers($vars){
	$vars['scope']				= 'volunteers';
	$r 								= $this->get_contacts($vars);
	return $r;
}

function get_advocates($vars){
	$vars['scope']				= 'advocates';
	$r 								= $this->get_contacts($vars);
	return $r;
}

function get_foster_parents($vars){
	$vars['scope']				= 'foster_families';
	$r 								= $this->get_contacts($vars);
	return $r;
}


function get_contacts($vars=NULL, $instance_url=NULL, $access_token=NULL) {
	
	$arr_limiters					= array('account_id', 'name_first', 'name_last', 'foster_family_status', 'is_volunteer', 'is_advocate', 'is_foster_family', 'last_update');
	$i									= 0;
	$scope							= 'contacts';
	$r['total_records']			= 0;
	if(!empty($vars['scope'])){
		$scope						= $vars['scope'];
	}
	
	if(!empty($vars['scope'])){
		$scope			= $vars['scope'];
	}
	
	if(!empty($_SESSION['salesforce_contacts_'.$scope]['time']) && empty($vars['force_update'])){
		return $_SESSION['salesforce_contacts_'.$scope];
	}
	
	switch($scope){
		case 'advocate':
		case 'advocates':
			$vars['is_advocate']		= 1;
			$extra_fields					= ", GW_Volunteers__Volunteer_Status__c , Volunteer_Interests__c, Tier_2_Volunteer__c, Key_LTP_Church_Staff__c, Key_Church_Staff__c, Church__c, LeadAdvocate__c, Advocate_Team__c";
		break;
		case 'volunteers':
			$vars['is_volunteer']		= 1;
			$extra_fields					= ", GW_Volunteers__Volunteer_Status__c , Volunteer_Interests__c, Tier_2_Volunteer__c, Key_LTP_Church_Staff__c, Key_Church_Staff__c, Church__c, LeadAdvocate__c, Advocate_Team__c";
		break;
		case 'foster_families':
			$vars['is_foster_family']	= 1;
			//$extra_fields					= ", Foster_Family_Status__c, Birthdate, Church__c, LeadAdvocate__c, Advocate_Team__c, External_Household_ID__c, IsFosterParent__c";
			$extra_fields					= ", Foster_Family_Status__c, Birthdate, Church__c, External_Household_ID__c";
		break;
		default:
			$extra_fields	= '';
		break;
	}
	 
	$query 	= "SELECT Id, Email, FirstName, LastName, MailingStreet, MailingCity, MailingState ,MailingPostalCode, Phone, RecordTypeId, AccountId,  LTP_Advocate_Status__c, SystemModStamp, LastModifiedDate $extra_fields FROM Contact";
	
	//LTP_Volunteer_Served__c, LTP_Volunteer_Prepared__c, LTP_Advocate_Trained__c,
	
	
	if(!empty($vars)){
		foreach($vars as $key => $val){
			 if(in_array(strtolower($key), $arr_limiters) && $i < 1){
				$query .= " WHERE ";		 
				$i++;
			 }
		}
	}
	
	if(!empty($vars['account_id'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "AccountID ='".$vars['account_id']."'";
		$i++;
	}
	if(!empty($vars['name_first'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "FirstName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['email'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Email ='".$vars['email']."'";
		$i++;
	}
	if(!empty($vars['name_last'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "LastName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['foster_family_status'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Foster_Family_Status__c ='".$vars['foster_family_status']."'";
		$i++;
	}
	if(!empty($vars['is_volunteer'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Volunteer__c = TRUE";
		$i++;
	}
	if(!empty($vars['is_advocate'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "LeadAdvocate__c = TRUE";
		$i++;
	}
	/*
	if(!empty($vars['is_foster_family'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "IsFosterParent__c = TRUE";
		$i++;
	}
	*/
	if(!empty($vars['is_foster_family'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Foster_Family_Status__c != null";
		$i++;
	}
	if(!empty($vars['last_mod_system'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_mod_system'])){
			$vars['last_mod_system']		= $this->convert_unix_to_sf_timestamp($vars['last_mod_system']);
		}
		$query .= "SystemModStamp >= ".$vars['last_mod_system'];
		$i++;
	}
	if(!empty($vars['last_update'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_update'])){
			$vars['last_update']		= $this->convert_unix_to_sf_timestamp($vars['last_update']);
		}
		$query .= "LastModifiedDate >= ".$vars['last_update'];
		$i++;
	}
	
	if(!empty($vars['debug']) || !empty($vars['show_query'])){
		echo '<p>'.$query.'</p>';
	}

	if(!empty($vars['debug_stop'])){
		echo '<p>'.$query.'</p>';
		exit();
	}
	
	//$query .=" LIMIT 10000";
	
	
	$records								= array();
	$call['query']							= $query;
	$response['nextRecordsUrl']	= 1;
	
	while(!empty($response['nextRecordsUrl'])){
		$call['nextRecordsUrl']		= $response['nextRecordsUrl'];
		$response							= $this->curl_call($call);
			if(!empty($response[0]['errorCode'])){
			echo '<br /><br />Error Code: '.$response[0]['errorCode'];
			echo '<br /><br />Error message: '.$response[0]['message'];
			return $response[0];
		}else{
			$records							= array_merge($records,$response['records']);	
			$r['total_records']				+= $response['totalSize'];
		}
	}	
	
	//Correct timestamps
	foreach($records as $key => $val){
		$records[$key]['sf_mod_sys']			= 0;
		$records[$key]['sf_mod_last']			= 0;
		if(!empty($val['SystemModstamp'])){
			$records[$key]['sf_mod_sys']						= strtotime($val['SystemModstamp']);
		}
		if(!empty($val['LastModifiedDate'])){
			$records[$key]['sf_mod_last']						= strtotime($val['LastModifiedDate']);
		}
	}
	
   
	$r['total_records']		= $response['totalSize'];
	$r['time']					= time();
	$r['data']					= $records;
	$r['assoc']					= array();
	
	if(!empty($records)){
		foreach($records as $cur){
			$cur_id_salesforce						= $cur['AccountId'];
			$r['assoc'][$cur_id_salesforce]	= $cur;
		}
	}
	
	if(empty($vars['skip_session'])){
		$_SESSION['salesforce_contacts_'.$scope]	= $r;
	}
	
	
	return $r;
    
}

function get_care_communities($vars){
	$vars['scope']				= 'care_communities';
	$r 								= $this->get_campaigns($vars);
	return $r;
}

function get_campaigns($vars=NULL, $instance_url=NULL, $access_token=NULL) {
	
	$arr_limiters					= array('account_id', 'name_first', 'name_last', 'record_type', 'type', 'last_update');
	$i									= 0;
	$scope							= 'campaigns';
	$r['total_records']			= 0;
	if(!empty($vars['scope'])){
		$scope			= $vars['scope'];
	}
	
	if(!empty($_SESSION['salesforce_'.$scope]['time']) && empty($vars['force_update'])){
		return $_SESSION['salesforce_'.$scope];
	}
	
	switch($scope){
		case 'care_communities':
			//$vars['record_type']		= 'Volunteer Campaign';
			$vars['type']						= 'Care Team Group';
			//$extra_fields					= ", Foster_Family_Status__c, Birthdate, Church__c, LeadAdvocate__c, Advocate_Team__c";
			$extra_fields	= '';
		break;
		default:
			$extra_fields	= '';
		break;
	}
	//campaign member object volunteers
	 
	$query 	= "SELECT Id, Name, Type, IsActive, HierarchyNumberOfContacts, Status, StartDate, Family_Household_Account__c, Family_Household_Name__c, Confirmed_Volunteers__c, External_Household_ID__c, EndDate, RecordTypeId,  SystemModStamp, LastModifiedDate, Location__c $extra_fields FROM Campaign";
	
	
	if(!empty($vars)){
		foreach($vars as $key => $val){
			 if(in_array(strtolower($key), $arr_limiters) && $i < 1){
				$query .= " WHERE ";		 
				$i++;
			 }
		}
	}
	
	if(!empty($vars['account_id'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "AccountID ='".$vars['account_id']."'";
		$i++;
	}
	if(!empty($vars['name_first'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "FirstName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['name_last'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "LastName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['foster_family_status'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Foster_Family_Status__c ='".$vars['foster_family_status']."'";
		$i++;
	}
	if(!empty($vars['is_volunteer'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Volunteer__c = TRUE";
		$i++;
	}
	if(!empty($vars['record_type'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "RecordType = '".$vars['record_type']."'";
		$i++;
	}
	if(!empty($vars['type'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Type = '".$vars['type']."'";
		$i++;
	}
	if(!empty($vars['is_foster_family'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "IsFosterParent__c = TRUE";
		$i++;
	}
	if(!empty($vars['last_mod_system'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_mod_system'])){
			$vars['last_mod_system']		= $this->convert_unix_to_sf_timestamp($vars['last_mod_system']);
		}
		$query .= "SystemModStamp >= ".$vars['last_mod_system'];
		$i++;
	}
	if(!empty($vars['last_update'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_update'])){
			$vars['last_update']		= $this->convert_unix_to_sf_timestamp($vars['last_update']);
		}
		$query .= "LastModifiedDate >= ".$vars['last_update'];
		$i++;
	}
	
	
	if(!empty($vars['debug'])){
		echo '<p>'.$query.'</p>';
	}

	if(!empty($vars['debug_stop'])){
		echo '<p>'.$query.'</p>';
		exit();
	}
	
	
	$records								= array();
	$call['query']							= $query;
	$response['nextRecordsUrl']	= 1;
	
	while(!empty($response['nextRecordsUrl'])){
		$call['nextRecordsUrl']		= $response['nextRecordsUrl'];
		$response							= $this->curl_call($call);
			if(!empty($response[0]['errorCode'])){
			echo '<br /><br />Error Code: '.$response[0]['errorCode'];
			echo '<br /><br />Error message: '.$response[0]['message'];
			return $response[0];
		}else{
			$records							= array_merge($records,$response['records']);	
		}
	}	
	
	//Correct timestamps
	foreach($records as $key => $val){
		$records[$key]['sf_mod_sys']			= 0;
		$records[$key]['sf_mod_last']			= 0;
		if(!empty($val['SystemModstamp'])){
			$records[$key]['sf_mod_sys']						= strtotime($val['SystemModstamp']);
		}
		if(!empty($val['LastModifiedDate'])){
			$records[$key]['sf_mod_last']						= strtotime($val['LastModifiedDate']);
		}
	}
	
   
	$r['total_records']			= $response['totalSize'];
	$r['time']						= time();
	$r['data']						= $records;
	$r['assoc']					= array();
	
	/*
	if(!empty($records)){
		foreach($records as $cur){
			$cur_id_salesforce						= $cur['AccountId'];
			$r['assoc'][$cur_id_salesforce]	= $cur;
		}
	}
	*/
	$_SESSION['salesforce_'.$scope]	= $r;
	
	return $r;
    
}

function get_campaign_members($vars=NULL, $instance_url=NULL, $access_token=NULL) {
	
	$arr_limiters					= array('campaign_id', 'name_first', 'name_last', 'record_type', 'type', 'last_update');
	$i									= 0;
	$scope							= 'campaigns';
	$r['total_records']			= 0;
	if(!empty($vars['scope'])){
		$scope			= $vars['scope'];
	}
	
	if(!empty($_SESSION['salesforce_'.$scope]['time']) && empty($vars['force_update'])){
		return $_SESSION['salesforce_'.$scope];
	}
	
	switch($scope){
		case 'care_communities':
			//$vars['record_type']		= 'Volunteer Campaign';
			$vars['type']						= 'Care Team Group';
			//$extra_fields					= ", Foster_Family_Status__c, Birthdate, Church__c, LeadAdvocate__c, Advocate_Team__c";
			$extra_fields	= '';
		break;
		default:
			$extra_fields	= '';
		break;
	}
	//campaign member object volunteers
	// SELECT Contact.FirstName, Contact.Title FROM CampaignMember WHERE CampaignId='701i00000010q96'

	$query 	= "SELECT CampaignId, ContactId, Contact.FirstName, Contact.LastName, Contact.Email, Contact.MailingStreet, Contact.MailingCity, Contact.MailingState , Contact.MailingPostalCode, Contact.Phone, Campaign_Member_Current_Role__c, SystemModStamp, LastModifiedDate $extra_fields FROM CampaignMember";
	
	
	if(!empty($vars)){
		foreach($vars as $key => $val){
			 if(in_array(strtolower($key), $arr_limiters) && $i < 1){
				$query .= " WHERE ";		 
				$i++;
			 }
		}
	}
	
	if(!empty($vars['campaign_id'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "CampaignID ='".$vars['campaign_id']."'";
		$i++;
	}
	if(!empty($vars['name_first'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Contact.FirstName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['name_last'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Contact.LastName ='".$vars['name_first']."'";
		$i++;
	}
	
	if(!empty($vars['last_mod_system'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_mod_system'])){
			$vars['last_mod_system']		= $this->convert_unix_to_sf_timestamp($vars['last_mod_system']);
		}
		$query .= "SystemModStamp >= ".$vars['last_mod_system'];
		$i++;
	}
	if(!empty($vars['last_update'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_update'])){
			$vars['last_update']		= $this->convert_unix_to_sf_timestamp($vars['last_update']);
		}
		$query .= "LastModifiedDate >= ".$vars['last_update'];
		$i++;
	}
	
	
	if(!empty($vars['debug'])){
		echo '<p>'.$query.'</p>';
	}

	if(!empty($vars['debug_stop'])){
		echo '<p>'.$query.'</p>';
		exit();
	}
	
	
	$records								= array();
	$call['query']							= $query;
	$response['nextRecordsUrl']	= 1;
	
	while(!empty($response['nextRecordsUrl'])){
		$call['nextRecordsUrl']		= $response['nextRecordsUrl'];
		$response							= $this->curl_call($call);
			if(!empty($response[0]['errorCode'])){
			echo '<br /><br />Error Code: '.$response[0]['errorCode'];
			echo '<br /><br />Error message: '.$response[0]['message'];
			return $response[0];
		}else{
			$records							= array_merge($records,$response['records']);	
		}
	}	
	
	//Correct timestamps
	foreach($records as $key => $val){
		$records[$key]['sf_mod_sys']			= 0;
		$records[$key]['sf_mod_last']			= 0;
		if(!empty($val['SystemModstamp'])){
			$records[$key]['sf_mod_sys']						= strtotime($val['SystemModstamp']);
		}
		if(!empty($val['LastModifiedDate'])){
			$records[$key]['sf_mod_last']						= strtotime($val['LastModifiedDate']);
		}
	}
	
   
	$r['total_records']			= $response['totalSize'];
	$r['time']						= time();
	$r['data']						= $records;
	$r['assoc']					= array();
	
	/*
	if(!empty($records)){
		foreach($records as $cur){
			$cur_id_salesforce						= $cur['AccountId'];
			$r['assoc'][$cur_id_salesforce]	= $cur;
		}
	}
	*/
	$_SESSION['salesforce_campaign_members']	= $r;
	
	return $r;
    
}

function get_churches($vars){
	$vars['scope']				= 'churches';
	$r 								= $this->get_accounts($vars);
	return $r;
}

function get_agencies($vars){
	$vars['scope']				= 'agencies';
	$r 								= $this->get_accounts($vars);
	return $r;
}
function get_affiliates($vars){
	$vars['scope']				= 'affiliates';
	$r 								= $this->get_accounts($vars);
	return $r;
}

function get_foster_families($vars){
	return $this->get_families($vars);
}

function get_families($vars){ 
	$vars['scope']				= 'foster_families';
	//$vars['account_id']						= '001F0000018LNxCIAW';
	$r 								= $this->get_accounts($vars);
	
	return $r;
}

function get_accounts($vars=NULL, $instance_url=NULL, $access_token=NULL) {
	
	$arr_limiters						= array('account_id', 'name_first', 'name_last', 'record_type', 'type', 'partner_type', 'last_update', 'foster_families_only');
	$i											= 0;
	$r['total_records']				= 0;
	$scope									= 'accounts';
	if(!empty($vars['scope'])){
		$scope								= $vars['scope'];
	}
	
		
	if(!empty($_SESSION['salesforce_'.$scope]['time']) && empty($vars['force_update'])){
		return $_SESSION['salesforce_'.$scope];
	}
	
	
	switch($scope){
		case 'churches':			
			$vars['partner_type']		= 'Church';
			$extra_fields					= ", County__c, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, Billing_Contact_Name__c, Billing_Email__c, LTP_Affiliate_Name__c, LTP_Reg_Mgr__c";
		break;
		case 'affiliates':			
			$vars['partner_type']		= 'Affiliate';
			$extra_fields					= ", County__c, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, Billing_Contact_Name__c, Billing_Email__c, LTP_Affiliate_Name__c, LTP_Reg_Mgr__c";
		break;
		case 'agencies':
		case 'agency':
			$vars['type']						= 'Agency';
			$extra_fields					= ", County__c, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, Billing_Contact_Name__c, Billing_Email__c, LTP_Affiliate_Name__c";
		break;
		case 'foster_families':
		case 'families':
			//$vars['type']						= 'Household';
			$vars['foster_families_only']		= 1;
			$extra_fields					= ",  Does_or_has_had_a_foster_placement__c, LTP_Recruited_Foster_Family__c, LTP_Foster_Family_Recruiting_Church__c, Foster_Family_Approving_Agency__c, LTP_Partnership_Type__c, CC_Recruited_Foster_Family__c";
		break;
		default:
			$extra_fields	= '';
		break;
	}
	 
	$query 	= "SELECT Id, Name, Phone, BillingStreet, BillingCity, BillingState ,BillingPostalCode, RecordTypeId, Type, Foster_family_status__c, LTP_Partner_Join_Date__c, LTP_Partner_Status__c, SystemModStamp, LastModifiedDate $extra_fields from Account";
	
	if(!empty($vars)){
		foreach($vars as $key => $val){
			 if(in_array(strtolower($key), $arr_limiters) && $i < 1){
				$query .= " WHERE ";		 
				$i++;
			 }
		}
	}
	
	if(!empty($vars['account_id'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Id ='".$vars['account_id']."'";
		$i++;
	}	
	if(!empty($vars['name_first'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "FirstName ='".$vars['name_first']."'";
		$i++;
	}
	if(!empty($vars['name_last'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "LastName ='".$vars['name_first']."'";
		$i++;
	}
	
	if(!empty($vars['foster_family_status'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Foster_Family_Status__c ='".$vars['foster_family_status']."'";
		$i++;
	}
	if(!empty($vars['foster_families_only'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Foster_Family_Status__c != null";
		$i++;
	}
	if(!empty($vars['is_volunteer'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Volunteer__c = TRUE";
		$i++;
	}
	if(!empty($vars['record_type'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$i++;
	}
	if(!empty($vars['type'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "Type = '".$vars['type']."'";
		$i++;
	}
	if(!empty($vars['partner_type'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		$query .= "LTP_Partnership_Type__c = '".$vars['partner_type']."'";
		$i++;
	}
	if(!empty($vars['last_mod_system'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_mod_system'])){
			$vars['last_mod_system']		= $this->convert_unix_to_sf_timestamp($vars['last_mod_system']);
		}
		$query .= "SystemModStamp >= ".$vars['last_mod_system'];
		$i++;
	}
	if(!empty($vars['last_update'])){
		if($i > 1 ){
			$query .= " AND ";
		}
		if(is_numeric($vars['last_update'])){
			$vars['last_update']		= $this->convert_unix_to_sf_timestamp($vars['last_update']);
		}
		$query .= "LastModifiedDate >= ".$vars['last_update'];
		$i++;
	}
	
	if(!empty($vars['show_query'])){
		echo '<br /><br />'.$query;	
	}
	
	if(!empty($vars['query_only'])){
		echo '<br /><br />'.$query;	
		exit();
	}
	
	$records										= array();
	$call['query']									= $query;
	$response['nextRecordsUrl']		= 1;
	
	while(!empty($response['nextRecordsUrl'])){
		$call['nextRecordsUrl']				= $response['nextRecordsUrl'];
		$response								= $this->curl_call($call);
			if(!empty($response[0]['errorCode'])){
			echo '<br /><br />Error Code: '.$response[0]['errorCode'];
			echo '<br /><br />Error message: '.$response[0]['message'];
			return $response[0];
		}else{
			$records								= array_merge($records,$response['records']);	
			
		}
	}	
   
	//Correct timestamps
	foreach($records as $key => $val){
		$records[$key]['sf_mod_sys']							= 0;
		$records[$key]['sf_mod_last']							= 0;
		if(!empty($val['SystemModstamp'])){
			$records[$key]['sf_mod_sys']						= strtotime($val['SystemModstamp']);
		}
		if(!empty($val['LastModifiedDate'])){
			$records[$key]['sf_mod_last']						= strtotime($val['LastModifiedDate']);
		}
	}
   
	$r['time']						= time();
	$r['data']						= $records;	
	$r['assoc']					= array();
	$r['total_records']		=$response['totalSize'];

	if(!empty($records)){
		foreach($records as $cur){
			$cur_id_salesforce						= $cur['Id'];
			$r['assoc'][$cur_id_salesforce]		= $cur;
		}
	}

	$_SESSION['salesforce_'.$scope]	= $r;
	
	//print_array($r);
	
	
	return $r;
    
}

function create_account($name, $instance_url=NULL, $access_token=NULL) {
	
	$auth 						= $this->get_salesforce_oauth_credentials($instance_url, $access_token);
	
    $url = $auth['instance_url']."/services/data/v20.0/sobjects/Account/";


    $content = json_encode(array("Name" => $name));

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
            array("Authorization: OAuth ".$auth['access_token'],
                "Content-type: application/json"));
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

    $json_response = curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ( $status != 201 ) {
        die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }
    
    echo "HTTP status $status creating account<br/><br/>";

    curl_close($curl);

    $response = json_decode($json_response, true);

    $id = $response["id"];

    echo "New record id $id<br/><br/>";

    return $id;
}

function show_account($id, $instance_url=NULL, $access_token=NULL) {
	
	$auth 						= $this->get_salesforce_oauth_credentials($instance_url, $access_token);
	
    $url 							= $auth['instance_url']."services/data/v20.0/sobjects/Account/$id";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
            array("Authorization: OAuth ".$auth['access_token']));

    $json_response = curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ( $status != 200 ) {
        die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }

    echo "HTTP status $status reading account<br/><br/>";

    curl_close($curl);

    $response = json_decode($json_response, true);

    foreach ((array) $response as $key => $value) {
        echo "$key:$value<br/>";
    }
    echo "<br/>";
}

function update_account($vars, $instance_url=NULL, $access_token=NULL) {
	
	$auth 						= $this->get_salesforce_oauth_credentials($instance_url, $access_token);
	
	$url 							= $auth['instance_url']."/services/data/v20.0/sobjects/Account/$id";
	$sf_fields_bypass		= array('id');
	$sf_fields					= array();
	
	foreach($vars as $key => $val){
		if(!in_array($key, $sf_fields_bypass)){
			$sf_fields[$key] = $val;	
		}
	}
    $content = json_encode(sf_fields);

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
            array("Authorization: OAuth ".$auth['access_token'],
                "Content-type: application/json"));
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PATCH");
    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

    curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ( $status != 204 ) {
        die("Error: call to URL $url failed with status $status, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }

    echo "HTTP status $status updating account<br/><br/>";

    curl_close($curl);
}

function delete_account($id, $instance_url=NULL, $access_token=NULL) {
	
	$auth 		= $this->get_salesforce_oauth_credentials($instance_url, $access_token);
	
	$url 			= $auth['instance_url']."/services/data/v20.0/sobjects/Account/$id";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_HTTPHEADER,
            array("Authorization: OAuth ".$auth['access_token']));
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");

    curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ( $status != 204 ) {
        die("Error: call to URL $url failed with status $status, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }

    echo "HTTP status $status deleting account<br/><br/>";

    curl_close($curl);
}

function get_salesforce_oauth_credentials($instance_url=NULL, $access_token=NULL){
	
	
	if(empty($instance_url) && !empty($_SESSION['salesforce']['instance_url'])){
		$auth['instance_url'] 		= $_SESSION['salesforce']['instance_url'];
	}
	
	if(empty($access_token) && !empty($_SESSION['salesforce']['access_token'])){
		$auth['access_token'] 		= $_SESSION['salesforce']['access_token'];
	}
	
	if(empty($instance_url) || empty($access_token)){
		$auth 														= $this->get_config();	
		$_SESSION['salesforce']['access_token']		= $auth['access_token'];
		$_SESSION['salesforce']['instance_url']		= $auth['instance_url'];
	}
	
	if(empty($instance_url) && !empty($_SESSION['salesforce']['instance_url'])){
		$instance_url 		= $_SESSION['salesforce']['instance_url'];
	}else{
		 die("Error - instance URL missing from session!");
	}
	
	if(empty($access_token) && !empty($_SESSION['salesforce']['access_token'])){
		$access_token 		= $_SESSION['salesforce']['access_token'];
	}else{
		 die("Error - access token missing from session!");
	}
	
	return $auth;
	
	
}

function get_oauth($redirect=NULL){
	$config 		= $this->get_config();
	if(empty($redirect)){
		$redirect	= $config['redirect_uri'];
	}
	$auth_url 		= $config['login_url']."/services/oauth2/authorize?response_type=code&client_id=". $config['client_id'] . "&redirect_uri=" .urlencode($redirect);
	
	redirect($auth_url);
}


function get_sf_key_from_ps_key($vars){
	$sf_fields_map			= $this->get_salesforce_serves_fields_map(array('scope' =>$vars['scope']));	
	$vars['key']				= trim($vars['key'], ' ');
	
	
	foreach($sf_fields_map AS $key => $val){
		if(strtolower($val) == strtolower($vars['key'])){
			return $key;
		}
	}
}



function get_salesforce_serves_fields_map($vars=NULL){
	$map 						= array();
	if(empty($vars['scope'])){
		$vars['scope']		= null;
	}
	$map['Name']												= null;
	$map['Id']														= 'id_salesforce';
	$map['FirstName']										= 'name_first';
	$map['LastName']											= 'name_last';
	$map['npo02__Informal_Greeting__c']		= 'name_first';
	$map['Nickname__c']									= 'name_nick';
	
	
	
	switch($vars['scope']){
		case 'community':
		case 'campaign':
			$map['Id']														= 'community_id_salesforce';
			$map['Location__c']										= 'church_id_salesforce';
			$map['Family_Household_Account__c']		='family_id_salesforce';
			$map['Name']												= 'community_name';			
			$map['Population_Served__c']						= 'population_served';
			$map['StartDate']											= 'date_start';
			$map['EndDate']											= 'date_end';
			$map['Status']												= 'community_state';
		break;
		case 'contact':
		case 'people':
		case 'volunteer':
		case 'foster_parent':
		case 'fosterparent':
		case 'parent':
			$map['MailingStreet']									='people_address_street_1';
			$map['MailingCity']										='people_address_city';
			$map['MailingState']									='people_address_state';
			$map['MailingPostalCode']							='people_address_zip';
			$map['FirstName']										='name_first';
			$map['LastName']											='name_last';
			$map['Email']												='people_email';
			$map['MobilePhone']									='people_phone_mobile';
			$map['HomePhone']										='people_phone_home';
			$map['Birthdate']											='people_dob';
			$map['Church__c']										='id_home_church_salesforce';
		break;
		case 'family':
		case 'families':
			$map['Name']																	= 'family_name';
			$map['Type']																	= 'Household';
			$map['Id']																			= 'family_id_salesforce';
			$map['LTP_Foster_Family_Recruiting_Church__c']			= 'church_id_salesforce';
			$map['Foster_family_status__c']										= 'family_state';
			$map['LTP_Partner_Join_Date__c']									= 'family_date_add';
			$map['IsFosterParent__c']												= 'is_foster_family';
			$map['npsp__Number_of_Household_Members__c']			= 'family_members_count';
			$map['BillingStreet']															='family_address_street_1';
			$map['BillingCity']															='family_address_city';
			$map['BillingState']															='family_address_state';
			$map['BillingPostalCode']													='family_address_zip';
			//$map['LTP_Recruited_Foster_Family__c']							='recruited_by_affiliate';
			$map['LTP_Recruited_Foster_Family__c']							='recruited_by_church';
			$map['Does_or_has_had_a_foster_placement__c']			= 'previously_fostered';
			$map['CC_Recruited_Foster_Family__c']							= 'previously_served_on_cc';
			
			

		break;
		case 'church':
			$map['LTP_Church__c']														= 'is_affiliate_church';	
		break;
	}
	
	
	return $map;
}

function get_sf_val_from_ps_val($vars=NULL){
	
	if(empty($vars['scope'])){
		$vars['scope']		= null;
	}
	
	$val		= $vars['val'];
		
	switch($vars['scope']){
		case 'family':
		
			//Correct Stat / Status
			switch(strtolower($vars['key'])){
				case  'family_state':
					switch($val){
						case 24:
							$val = 'Closed';
						break;
						case 22:
							$val = 'On Hold';
						break;
						case 30:
							$val = 'Open';
						break;
						case 35:
							$val = 'Respite Family';
						break;
						case 40:
							$val =  'Active Placement';						
						break;
						case 5:
							$val = 'Applicant';
						break;
					}
				break;
				case 'family_date_add':
					$val 		= date('Y-m-d', $val);
				break;
			}
			
		break;
		case 'community':
			switch(strtolower($vars['key'])){
				case 'community_state':
					switch($val){
						case 24:
							$val = 'Completed';
						break;
						case 22:
							$val = 'Aborted';
						break;
						case 40:
							$val =  'In Progress';						
						break;
						case 5:
						case 10:
						case 20:
							$val = 'Planned';
						break;
					}
				break;
			}
		break;
		case 'contact':
		case 'people':
		case 'foster_parent':
		case 'fosterparent':
		case 'parent':
			if(strpos(strtolower($vars['key']), 'phone') !== false){
				$val		= format_phone($val);
			}
		break;
	}

	return $val;
}



function queue_salesforce_sync($vars){
	if(empty($vars['destination'])){
		$vars['destination']	= 'sf';
	}
	
	if($vars['method'] == 'insert'){
		$vars['cmd'] = 'post';
	}elseif($vars['method'] == 'update'){
		$vars['cmd'] = 'patch';
	}
	
	
	switch(strtolower($vars['destination'])){
		case 'sf':
		case 'salesforce':
			$r['destination']	= 'sf';
			
		break;
		case 'ps':
		case 'promise':
		case 'promise_serves':
		case 'promiseserves':
		case 'promise serves':
		case 'promise-serves':
			$r['destination']	= 'ps';
			$r['cmd']				= 'get';
		break;
	}
	
	$r['values'] 				= json_encode($vars['values']);
	$r['state']					= 1;
	
	$this->save_salesforce_sync_queue($r);
}

function save_salesforce_config($data=NULL){
	$post_check 				= $this->input->post('posted');
	$db_update 				= false;
	$password					= null;
	$reset_password 		= false;
	$state							= null;
	$user							= array();
	$debug						= null;
	
	if(!empty($_SESSION['logged_in'])){
		$user						= $_SESSION['logged_in'];	
	}
	
	
	if(isset($data['state'])){
		$state					= $data['state'];	
	}
	
	if(empty($user['id_people'])){
		$user['id_people']			= 1;
	}
	
	if(isset($post_check) && !empty($data)){
		$data 					= $this->input->post();
	}
		
		
	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_salesforce_config');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}
	
	$data['date_mod'] 				= time();
	$data['id_mod']						= $user['id_people'];

	if(isset($state)){
		$data['state']						= $state;
	}elseif(!isset($data['state']) && empty($data['id_salesforce_config'])){
		$data['state'] 					= 1;
	}
	 
	
	//Check to update table first
	if(!empty($data['id_salesforce_config'])){
		$this->db->where('id_salesforce_config', $data['id_salesforce_config']);
		if($this->db->update('ltp_salesforce_config', $data)){
			$result['db_update'] 								= TRUE;
			$result['status'] 									= TRUE;
			$result['id_salesforce_config']				= $data['id_salesforce_config'];
			$result['result']										= 'success';
			$result['method']									= 'update';
			$result['data']										= $data;
		}

	}else{
		$data['date_add'] 										= time();
		$data['id_add']											= $user['id_people'];
		if ($this->db->insert('ltp_salesforce_config', $data)){
			$result['db_update'] 								= TRUE;
			$result['status'] 									= TRUE;
			$result['id_salesforce_config']				= $this->db->insert_id();
			$result['result']										= 'success';
			$result['method']									= 'insert';
			$result['data']										= $data;
		}
	}
	
	$result['data']												= $data;
	$result['data']['id_salesforce_config']			= $result['id_salesforce_config'];
	$result['debug']												= $debug;
	
	return $result;
}

function save_salesforce_sync_log($data=NULL){
	$post_check 				= $this->input->post('posted');
	$db_update 				= false;
	$password					= null;
	$reset_password 		= false;
	$state							= null;
	$user							= array();
	$debug						= null;
	
	if(!empty($_SESSION['logged_in'])){
		$user						= $_SESSION['logged_in'];	
	}
	

	if(isset($data['state'])){
		$state					= $data['state'];	
	}
	
	if(empty($user['id_people'])){
		$user['id_people']			= 1;
	}
	
	if(isset($post_check) && !empty($data)){
		$data 					= $this->input->post();
	}
		
		
	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_salesforce_sync_log');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}
	
	if(isset($state)){
		$data['state']						= $state;
	}elseif(!isset($data['state']) && empty($data['id_sf_log'])){
		$data['state'] 					= 1;
	}
	 
	//Check to update table first
	if(!empty($data['id_sf_log'])){
		$this->db->where('id_sf_log', $data['id_sf_log']);
		if($this->db->update('ltp_salesforce_sync_log', $data)){
			$result['db_update'] 								= TRUE;
			$result['status'] 										= TRUE;
			$result['id_sf_log']									= $data['id_sf_log'];
			$result['result']											= 'success';
			$result['method']										= 'update';
			$result['data']											= $data;
		}

	}else{
		if ($this->db->insert('ltp_salesforce_sync_log', $data)){
			$result['db_update'] 								= TRUE;
			$result['status'] 										= TRUE;
			$result['id_sf_log']									= $this->db->insert_id();
			$result['result']											= 'success';
			$result['method']										= 'insert';
			$result['data']											= $data;
		}
	}
	
	$result['data']													= $data;
	$result['data']['id_sf_log']									= $result['id_sf_log'];
	$result['debug']												= $debug;
	
	return $result;
}

function  get_salesforce_sync_queues($vars=NULL){

	$sql = "SELECT  s.* FROM `ltp_salesforce_sync_queue` AS s WHERE s.id_sf_sync > '0'";
	
	if(!empty($vars['id_sf_sync'])){
		$sql .= " AND `id_sf_sync` = ".$this->db->escape($vars['id_sf_sync']);
	}
	if(!empty($vars['status'])){
			switch(strtolower($vars['status'])){
				case 'queued':
					$sql .= " AND s.`state` = '1'";
				break;
				case 'queued_retry':
					$sql .= " AND s.`state` IN (1, 5)";
				break;
			}
		
	}
	$query = $this->db->query($sql,false);
			
	if($query -> num_rows() > 0){
		$r = $query->result_array();
		return $r;
	}
	
	return null;
}

function  get_salesforce_sync_queue($vars=NULL){
	if(!empty($vars['id_sf_sync'])){
		$r = $this->get_salesforce_sync_queues();
		if(!empty($r[0]['id_sf_sync'])){
			return $r[0];
		}
	}
	return null;
}

function save_salesforce_sync_queue($data=NULL){
	$post_check 				= $this->input->post('posted');
	$db_update 					= false;
	$password					= null;
	$reset_password 			= false;
	$state							= null;
	$user							= array();
	$debug							= null;
	
	if(!empty($_SESSION['logged_in'])){
		$user						= $_SESSION['logged_in'];	
	}
	

	if(isset($data['state'])){
		$state					= $data['state'];	
	}
	
	if(empty($user['id_people'])){
		$user['id_people']			= 1;
	}
	
	$data['id_mod']				= $user['id_people'];
	$data['date_mod']			= time();
	
	if(isset($post_check) && empty($data)){
		$data 					= $this->input->post();
	}
		
		
	if(isset($data)){
		$schema 		= $this->db->list_fields('ltp_salesforce_sync_queue');
		foreach($data AS $key => $val){
			if(!in_array($key,$schema)){
				unset($data[$key]);
			}
		}
	}
	
	if(isset($state)){
		$data['state']						= $state;
	}elseif(!isset($data['state']) && empty($data['id_sf_sync'])){
		$data['state'] 					= 1;
	}
	 
	//Check to update table first
	if(!empty($data['id_sf_sync'])){
		$this->db->where('id_sf_sync', $data['id_sf_sync']);
		if($this->db->update('ltp_salesforce_sync_queue', $data)){
			$result['db_update'] 								= TRUE;
			$result['status'] 										= TRUE;
			$result['id_sf_sync']									= $data['id_sf_sync'];
			$result['result']											= 'success';
			$result['method']										= 'update';
			$result['data']											= $data;
		}

	}else{
		$data['id_add']												= $user['id_people'];
		$data['date_add']											= time();
		if ($this->db->insert('ltp_salesforce_sync_queue', $data)){
			$result['db_update'] 								= TRUE;
			$result['status'] 										= TRUE;
			$result['id_sf_sync']									= $this->db->insert_id();
			$result['result']											= 'success';
			$result['method']										= 'insert';
			$result['data']											= $data;
		}
	}
	
	$result['data']													= $data;
	$result['data']['id_sf_sync']								= $result['id_sf_sync'];
	$result['debug']												= $debug;
	
	return $result;
}

function run_salesforce_sync_queue($vars=null){
	
	$syncs						= $this->get_salesforce_sync_queues(array('status' => 'queued_retry'));
	$resp['log_html']		= '';
	$resp['from_sf']		= '';
	$resp['to_sf']			= '';
	if(!empty($syncs) && count($syncs) > 0){
		
		foreach($syncs as $cur){
			$call					= array();
			$cur_id_queue	= $cur['id_sf_sync'];
			switch(strtolower($cur['destination'])){
				case 'sf':
				
					switch(strtolower($cur['cmd'])){
						case 'post':
							switch(strtolower($cur['object'])){		
								case 'people':
								case 'person':
									if(!empty($cur['id_promise_serves'])){

										$post['id_people'] 	= $cur['id_promise_serves'];
										$post['log']				= 1;
										
										$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 2));
										$result 					= $this->update_sf_contacts_from_ps($post);
										
										if($result['response'] == 'success'){
											$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 10, 'date_sync' => time(), 'response' => 'success'));
											$resp['log_html']	.= '<br />Success: People ID: '.$post['id_people'].' - Queue ID: '.$cur_id_queue;
											$resp['to_sf']['contacts']['record_ids_processed'][]	= $post['id_people'];
										}else{
											$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 5, 'date_sync' => time(), 'response' => $result['response'], 'response_log' => implode("\r\n", $result['errors_human'])));
											$resp['log_html']	.= '<p>Error(s) in Queue ID: '.$cur_id_queue.' <br />'.implode("<br />-", $result['errors_human']);
											$resp['to_sf']['contacts']['record_ids_skipped'][]	= $post['id_people'];
										}
									}
								break; //End People Object
								case 'family':
								case 'families':
									if(!empty($cur['id_promise_serves'])){

										$post['id_family'] 		= $cur['id_promise_serves'];
										$post['log']				= 1;
										
										$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 2));
										$result 					= $this->update_sf_families_from_ps($post);
										
										if($result['response'] == 'success'){
											$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 10, 'date_sync' => time(), 'response' => 'success'));
											$resp['log_html']	.= '<br />Success: Family ID: '.$post['id_family'].' - Queue ID: '.$cur_id_queue;
											$resp['to_sf']['contacts']['record_ids_processed'][]	= $post['id_family'];
										}else{
											$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 5, 'date_sync' => time(), 'response' => $result['response'], 'response_log' => implode("\r\n", $result['errors_human'])));
											$resp['log_html']	.= '<p>Error(s) in Queue ID: '.$cur_id_queue.' <br />'.implode("<br />-", $result['errors_human']);
											$resp['to_sf']['contacts']['record_ids_skipped'][]	= $post['id_family'];
										}
										
										print_array($result);
									}
								break; //End Family Object
								case 'community':
								case 'communities':
									if(!empty($cur['id_promise_serves'])){

										$post['id_community'] 		= $cur['id_promise_serves'];
										$post['log']						= 1;
										
										$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 2));
										$result 							= $this->update_sf_communities_from_ps($post);
										
										if($result['response'] == 'success'){
											$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 10, 'date_sync' => time(), 'response' => 'success'));
											$resp['log_html']	.= '<br />Success: Community ID: '.$post['id_community'].' - Queue ID: '.$cur_id_queue;
											$resp['to_sf']['communities']['record_ids_processed'][]	= $post['id_community'];
										}else{
											$this->save_salesforce_sync_queue(array('id_sf_sync' => $cur_id_queue, 'state' => 5, 'date_sync' => time(), 'response' => $result['response'], 'response_log' => implode("\r\n", $result['errors_human'])));
											$resp['log_html']	.= '<p>Error(s) in Queue ID: '.$cur_id_queue.' <br />'.implode("<br />-", $result['errors_human']);
											$resp['to_sf']['communities']['record_ids_skipped'][]	= $post['id_community'];
										}
										
										print_array($result);
									}
								break; //End Community Object
							}
						break; //End Post Cmd
					}
					
				break; //End SF destination
				case 'ps':
				
				break;
			}

		}// End Foreach
	
	}else{
		$resp['log_html']	= 'Nothing queued to sync';
	} //End If count
}

function get_promise_id_from_care_community_name($data){
	if(!empty($data) && empty($data['community_name'])){
		$com									= $data;
		$data									= array();
		$data['community_name']	= $com;
	}
	
	
	if(strpos($data['community_name'],'.') !== false){
		$tmp_num						= explode('.',$data['community_name']);
		if(!empty($tmp_num[0])){
			$data['id_promise']		= preg_replace('/[^0-9]/', '', $tmp_num[0]);	
		}
	}
	
	if(empty($data['id_promise'])){
		$data['id_promise']			= preg_replace('/[^0-9]/', '', $data['community_name']);	
	}
	
	
	$data['community_name']						= str_replace($data['id_promise'].'. ', '',$data['community_name']);
	$data['community_name']						= str_replace($data['id_promise'].".\t", '',$data['community_name']);
	$data['community_name']						= str_replace($data['id_promise'].".", '',$data['community_name']);
	$data['community_name']						= str_replace($data['id_promise'], '',$data['community_name']);
	$data['community_name']						= str_replace(',', '',$data['community_name']);
	$data['community_name']						= str_ireplace(' and ', ' & ', $data['community_name']);
	$data['community_name']						= str_ireplace(' Care Community', '', $data['community_name']);
	$data['community_name']						= str_ireplace('Care Community', '', $data['community_name']);
	$data['community_name']						= str_ireplace(' Care Team', '', $data['community_name']);
	$data['community_name']						= str_ireplace(' Family', '', $data['community_name']);
	$data['community_name']						= str_ireplace('(2nd)', '', $data['community_name']);
	$data['community_name']						= str_ireplace('(3rd)', '', $data['community_name']);
	$data['community_name']						= str_ireplace('(4th)', '', $data['community_name']);
	$data['community_name']						= str_ireplace('(5th)', '', $data['community_name']);
	$data['community_name']						= trim($data['community_name'], ' ');
	$tempname											= explode(' ',$data['community_name']);
	$q = 0;
	foreach($tempname as $cur_tmp){
		if($q == 0){
			$data['community_name'] 	= $cur_tmp.',';
		}else{
			$data['community_name'] 	.= ' '.$cur_tmp;
		}
		$q++;
	}
	$data['community_name']						= trim($data['community_name'], ' ');
	
	return $data;
}

function get_sf_care_community_name($vars){
	$name		= '';
	if(!empty($vars['id_promise'])){
		$name .= $vars['id_promise'].'. ';
	}else{
		$comms 			= $this->communities_model->get_communities(array('order' => 'id_promise', 'order_dir' => 'DESC'));
		
		$id_pomise 		= $comms[0]['id_promise']	 + 1;
		$name 				.= $id_pomise.'. ';
	}
	if(!empty($vars['community_name'])){
		$name .= $vars['community_name'];
	}
	
	return $name;
}


function get_salesforce_sync_logs($vars=null){
		
	$sql = "SELECT * FROM `ltp_salesforce_sync_log` AS s WHERE s.`id_sf_log` > '0'";
	
	if(!empty($vars['salesforce_log_status'])){
		$vars['view']			= $vars['salesforce_log_status'];
	}
	
	if(!empty($vars['view'])){
		
		switch(strtolower($vars['view'])){
			case 'success_only':
				$sql .= " AND s.sync_result >=  '10'";		
				$sql .= " AND s.state > 0";
			break;
			case 'synced_only':
				$sql .= " AND s.total_count_synced >=  '1'";		
				$sql .= " AND s.state > 0";
			break;
			case 'skipped_only':
				$sql .= " AND s.total_count_skipped >=  '1'";		
				$sql .= " AND s.state > 0";
			break;
			case 'synced_and_skipped_only':
				$sql .= " AND s.total_count_skipped >=  '1'";		
				$sql .= " AND s.state > 0";
			break;
		}
		
	}else{
		if(!empty($vars['sf_log_ids'])){
			$sql .= " AND s.id_sf_log IN (".$vars['sf_log_ids'].")";
		}
		if(!empty($vars['sync_result'])){
			$sql .= " AND s.sync_result =  ".$this->db->escape($vars['sync_result']);
		}
		if(!empty($vars['sync_type'])){
			$sql .= " AND s.sync_type =  ".$this->db->escape($vars['sync_type']);
		}
		if(!empty($vars['sync_dir'])){
			$sql .= " AND s.sync_dir =  ".$this->db->escape($vars['sync_dir']);
		}
		if(isset($vars['state'])){
			$sql .= " AND s.state = ".$this->db->escape($vars['state']);
		}else{
			$sql .= " AND s.state > 0";
		}
	}
	
	
	if(isset($vars['order'])){
		$sql .= " ORDER BY ".$this->db->escape($vars['order']);
	}else{
		$sql .= " ORDER BY s.date_sync";
	}
	if(isset($vars['order_dir'])){
		$sql .= " ".$vars['order_dir'];
	}else{
		$sql .= " DESC";
	}
	if(isset($vars['limit'])){
		$sql .= " LIMIT ".$vars['limit'];
	}else{
		$sql .= " LIMIT 0,500";
	}
	
	$query = $this->db->query($sql,false);
	//echo $sql;
	
   if($query -> num_rows() > 0){
	   
		$r = $query->result_array();
		
		
		foreach($r as $key => $val){
			if(!empty($r[$key]['id_sf_log'])){
				$r[$key]['id_sf_log_encoded']		= url_enc($r[$key]['id_sf_log']);	
			}
		}

		return $r;
	 
   }elseif(!empty($vars['return_schema'])){
		 return $empty;
	}else{
		
		return null;
	}
 }
 
 function get_salesforce_sync_log($vars){
	 if(empty($vars['id_sf_log'])){
		 return null;
	 }
	 
	 $r = $this->get_salesforce_sync_logs($vars);
	 
	 if(!empty($r[0]['id_sf_log'])){
		 return $r[0];
	 }
	 
	 return null;
 }
 
 function can_run_salesforce_sync($vars=null){
	
	 $r = $this->get_salesforce_sync_logs();
	 
	 if(!empty($r[0]['state']) && $r[0]['state'] > 1){
		 return true;
	 }
	 
	 return false;	 
 }

 function get_last_salesforce_sync_time($vars){
	 $time		= 0;
	 $margin	= 5;
	 
	 if(empty($vars['time_format'])){
		$vars['time_format']	= 'unix';
	}
	 
	 $r = $this->get_salesforce_sync_logs();
	 
	 
	 if(!empty($r[0]['id_sf_log'])){
		 foreach($r as $cur){
			 if($cur['state'] > 1 && empty($time)){
				$time 	= $cur['date_sync'] - $cur['total_run_time'] - $margin;		 
			 }
		 }
	 }
	 
	 switch(strtolower($vars['time_format'])){
		 case 'salesforce':
		 case 'sf':
			$time 					= $this->convert_unix_to_sf_timestamp($time);
		 break;
		 case 'array':
			$new					= $time;
			unset($time);
			$time					= array();
			$time['unix']			= $new;
			$time['sf']				= $this->convert_unix_to_sf_timestamp($new);
		 break;
		 default:
			
		 break;
	 }
	 
	 return $time;
	 
 }
 
 function convert_unix_to_sf_timestamp($time=NULL){
		if(empty($time)){
			$time = time();
		}
		
		$date		= date('Y-m-d', $time);
		$time		= $date.'T'.date('H:i:s', $time).'Z';
		return $time;
 }
 
 function get_sync_result_from_log_result_status($vars){
	 if(!empty($vars) && !is_array($vars)){
		$new									= $vars;
		$vars									= array();
		$vars['sync_result']				= $new;
	}
	switch(strtolower($vars['sync_result'])){
		case 1:
		case 10:
		case 4:
			return 'Success';
		break;
		case 30:
			return 'Some Errors';
		break;
		case 0:
			return 'Error';
		break;
	}
	
 }
 
 
 function update_ps_affiliates_from_sf($vars){
	$r 											= array('result' => 'running', 'state' => 1, 'records' => 0, 'records_skipped' => 0, 'record_ids_processed' => array(), 'record_ids_skipped' => array());
	$vars['force_update']				= 1;
	$aff											= $this->salesforce_model->get_affiliates($vars);
	
	if(!empty($aff['errorCode'])){
		$r['result']							= 'error '.$arr['errorCode'].' - '.$arr['message'];
		$r['state']								= 3;
		return $r;
	}

	foreach($aff['data'] AS $key => $val){
		$result												= array();
		$update											= array();
		$update['id_salesforce']					= $val['Id'];
		
		switch(strtolower($val['LTP_Partner_Status__c'])){
			case 'closed':
				$update['state']				= 24;
			break;
			case 'inactive':
				$update['state']				= 22;
			break;
			case 'open':
				$update['state']				= 30;
			break;
			case 'active':
				$update['state']				= 40;
			break;
			case 'prospect':
				$update['state']				= 10;
			break;
			default:
				$update['state']				= 5;
			break;
		}
		
		$update['affiliate_name']									= $val['Name'];
		$update['affiliate_contact_name']						= $val['Billing_Contact_Name__c'];
		$update['affiliate_contact_email']						= $val['Billing_Email__c'];
		if(strtotime($val['LTP_Partner_Join_Date__c']) > 0){
			$update['date_start']									= strtotime($val['LTP_Partner_Join_Date__c']);
		}
		$update['date_sync']										= time();
		$update['affiliate_phone']									= numeric_only($val['Phone']);
		
		if(!empty($val['ShippingStreet'])){
			$update['affiliate_address_street']				= $val['ShippingStreet'];
		}else{
			$update['affiliate_address_street']				= $val['BillingStreet'];
		}
		if(!empty($val['ShippingCity'])){
			$update['affiliate_address_city']					= $val['ShippingCity'];
		}else{
			$update['affiliate_address_city']					= $val['BillingCity'];
		}
		if(!empty($val['ShippingState'])){
			$update['affiliate_address_state']					= $this->website_model->get_state_abbrev($val['ShippingState']);
		}else{
			$update['affiliate_address_state']					= $this->website_model->get_state_abbrev($val['BillingState']);
		}
		if(!empty($val['ShippingPostalCode'])){
			$update['affiliate_address_zip']						= $val['ShippingPostalCode'];
		}else{
			$update['affiliate_address_zip']						= $val['BillingPostalCode'];
		}
		
		$cur_object														= $this->affiliates_model->get_affiliate_id_by_salesforce_id(array('id_salesforce' => $update['id_salesforce']));
		
		if(empty($cur_object['date_mod']) || (!empty($cur_object['date_mod']) && $cur_object['date_mod'] <= $val['sf_mod_last'])){
			$result															= $this->affiliates_model->save_affiliate($update);
			$results[]														= $result;
			$r['result']													= 'success';
			$r['data'][]													= $result;
			$r['records']++;	
			if($r['state']	!= 3){
				$r['state']													= 4;	
			}
			$r['record_ids_processed'][]						= $result['id_affiliate'];
		}else{
			$cur_object['skip_reason']							= 'PS Record Newer';
			$r['skipped_data'][]										= $cur_object;
			$r['records_skipped']++;	
			$r['state']														= 3;	
			$r['record_ids_skipped'][]								= $cur_object['id_affiliate'];
		}
		
	}
	
	if($r['state'] == 3 && !empty($r['records'])){
		$r['result']	= 'Completed with errors';
	}elseif($r['state'] == 3){
		$r['result']	= 'Error';
	}else{
		$r['result']	= 'Completed Successfully';
	}
	
	return $r;
}


function update_ps_agencies_from_sf($vars){
	$r 											= array('result' => 'running', 'state' => 1, 'records' => 0, 'records_skipped' => 0, 'record_ids_processed' => array(), 'record_ids_skipped' => array());
	$vars['force_update']				= 1;
	$age										= $this->salesforce_model->get_agencies($vars);
	
	if(!empty($age['errorCode'])){
		$r['result']						= 'error '.$age['errorCode'].' - '.$age['message'];
		$r['state']							= 3;
		return $r;
	}
	
	foreach($age['data'] AS $key => $val){
		$result												= array();
		$update											= array();
		$update['id_salesforce']					= $val['Id'];
		switch(strtolower($val['LTP_Partner_Status__c'])){
			case 'closed':
				$update['state']				= 24;
			break;
			case 'inactive':
				$update['state']				= 22;
			break;
			case 'open':
				$update['state']				= 30;
			break;
			case 'active':
				$update['state']				= 40;
			break;
			case 'prospect':
				$update['state']				= 10;
			break;
			default:
				$update['state']				= 40;
			break;
		}
		
		$update['agency_name']					= $val['Name'];
		if(strtotime($val['LTP_Partner_Join_Date__c']) > 0){
			$update['date_start']					= strtotime($val['LTP_Partner_Join_Date__c']);	
		}
		$update['date_sync']						= time();
		$update['agency_phone']					= numeric_only($val['Phone']);
		
		if(!empty($val['ShippingStreet'])){
			$update['agency_address_1']		= $val['ShippingStreet'];
		}else{
			$update['agency_address_1']		= $val['BillingStreet'];
		}
		if(!empty($val['ShippingCity'])){
			$update['agency_city']					= $val['ShippingCity'];
		}else{
			$update['agency_city']					= $val['BillingCity'];
		}
		if(!empty($val['ShippingState'])){
			$update['agency_state']				= $this->website_model->get_state_abbrev($val['ShippingState']);
		}else{
			$update['agency_state']				= $this->website_model->get_state_abbrev($val['BillingState']);
		}
		if(!empty($val['ShippingPostalCode'])){
			$update['agency_zip']					= $val['ShippingPostalCode'];
		}else{
			$update['agency_zip']					= $val['BillingPostalCode'];
		}
		
		$cur_object											= $this->agencies_model->get_agency_id_by_salesforce_id(array('id_salesforce' => $update['id_salesforce']));
		
		if(empty($cur_object['date_mod']) || (!empty($cur_object['date_mod']) && $cur_object['date_mod'] <= $val['sf_mod_last'])){
			$result												= $this->agencies_model->save_agency($update);
			$results[]											= $result;
			$r['result']											= 'success';
			$r['data'][]											= $result;
			
			$r['records']++;	
			if($r['state']	!= 3){
				$r['state']										= 4;	
			}
			$r['record_ids_processed'][]				= $result['id_agency'];
		}else{
			$cur_object['skip_reason']				= 'PS Record Newer';
			$r['skipped_data'][]							= $cur_object;
			$r['records_skipped']++;	
			$r['state']											= 3;	
			$r['record_ids_skipped'][]					= $cur_object['id_agency'];
		}
	}
	
	if($r['state'] == 3 && !empty($r['records'])){
		$r['result']	= 'Completed with errors';
	}elseif($r['state'] == 3){
		$r['result']	= 'Error';
	}else{
		$r['result']	= 'Completed Successfully';
	}
	
	return $r;
}

function update_ps_churches_from_sf($vars){
	$r 													= array('result' => 'running', 'state' => 1, 'records' => 0, 'records_skipped' => 0, 'record_ids_processed' => array(), 'record_ids_skipped' => array());
	$vars['force_update']						= 1;
	$vars['show_query']							= 1;
	$churches										= $this->salesforce_model->get_churches($vars);

	if(!empty($churches['errorCode'])){
		$r['result']						= 'error '.$churches['errorCode'].' - '.$churches['message'];
		$r['state']							= 3;
		return $r;
	}
	
	foreach($churches['data'] AS $key => $val){
		$church_name_parts						= null;
		$result												= array();
		$church											= array();
		$assign											= array('assignment_type' => 'church_to_affiliate');
		$church['id_salesforce']					= $val['Id'];
		
		
		switch(strtolower($val['LTP_Partner_Status__c'])){
			case 'closed':
				$church['state']				= 24;
			break;
			case 'inactive':
				$church['state']				= 22;
			break;
			case 'open':
				$church['state']				= 30;
			break;
			case 'active':
				$church['state']				= 40;
			break;
			case 'prospect':
				$church['state']				= 10;
			break;
			default:
				$church['state']				= 5;
			break;
		}
		
		$church_name_parts							= $this->churches_model->get_salesforce_church_name_parts($val['Name']);
		
		$church['church_name']						= $church_name_parts['church_name'];
		$church['campus_name']						= $church_name_parts['campus_name'];
		if(!empty($val['ShippingStreet'])){
			$church['address_street_1']			= $val['ShippingStreet'];
		}else{
			$church['address_street_1']			= $val['BillingStreet'];
		}
		if(!empty($val['ShippingCity'])){
			$church['address_city']					= $val['ShippingCity'];
		}else{
			$church['address_city']					= $val['BillingCity'];
		}
		if(!empty($val['ShippingState'])){
			$church['address_state']					= $this->website_model->get_state_abbrev($val['ShippingState']);
		}else{
			$church['address_state']					= $this->website_model->get_state_abbrev($val['BillingState']);
		}
		if(!empty($val['ShippingPostalCode'])){
			$church['address_zip']						= $val['ShippingPostalCode'];
		}else{
			$church['address_zip']						= $val['BillingPostalCode'];
		}
		$church['church_contact_name']			= $val['Billing_Contact_Name__c'];
		$church['phone']									= $val['Phone'];
		$church['church_contact_email']			= $val['Billing_Email__c'];
		$church['church_county']					= $val['County__c'];
		$church['affiliate_id_salesforce']			= $val['LTP_Affiliate_Name__c'];
		$church['date_sync']							= time();
		if(strtotime($val['LTP_Partner_Join_Date__c']) > 0){
			$church['date_start']						= strtotime($val['LTP_Partner_Join_Date__c']);
		}
		
		
		if(!empty($church['campus_name'])){
			$church['is_campus']						= 1;
		}
	
		$cur_object											= $this->churches_model->get_church_id_by_salesforce_id(array('id_salesforce' => $church['id_salesforce']));
		
		if(empty($cur_object['date_mod']) || (!empty($cur_object['date_mod']) && $cur_object['date_mod'] <= $val['sf_mod_last'])){
			$result												= $this->churches_model->save_church($church);
			
			if(empty($church['affiliate_id_salesforce'])){
				$assign['id_affiliate']						= 1;
			}else{
				$assign['id_affiliate']						= $this->affiliates_model->get_affiliate_id_by_salesforce_id($church['affiliate_id_salesforce']);	
			}
			
			$assign['id_church']							= $result['id_church'];
			$assign											= $this->people_model->save_assignment($assign);
			$r['result']										= 'success';
			$r['data']['churches'][]						= $result;
			$r['data']['assigns'][]						= $assign;
			$r['records']++;
			if($r['state']	!= 3){
				$r['state']										= 4;	
			}
			$r['record_ids_processed'][]			= $result['id_church'];
		}else{
			$cur_object['skip_reason']				= 'PS Record Newer';
			$r['skipped_data'][]							= $cur_object;
			$r['records_skipped']++;	
			$r['state']											= 3;
			$r['record_ids_skipped'][]					= $cur_object['id_church'];
		}
	}
	
	if($r['state'] == 3 && !empty($r['records'])){
		$r['result']	= 'Completed with errors';
	}elseif($r['state'] == 3){
		$r['result']	= 'Error';
	}else{
		$r['result']	= 'Completed Successfully';
	}
		
	return $r;
}


function update_ps_families_from_sf($vars){
	$arr_accounts							= array();
	$result										= array();
	$protected_merge_keys			= array('id_family', 'id_salesforce');
	$r 											= array('result' => 'running', 
																'state' => 1, 
																'records' => 0, 
																'records_skipped' => 0, 
																'record_ids_processed' => array(), 
																'record_ids_skipped' => array());
	//$vars['force_update']			= 1;
	$vars['scope']						= 'foster_families';
	$vars['show_query']				= 1;
	$accounts							= $this->salesforce_model->get_accounts($vars);
	$people								= $this->salesforce_model->get_foster_parents(array('force_update' => 0));
	$peep_to_account				= array();
	
	
	if(!empty($people)){
		foreach($people['data'] as $cur_peep){
			if(!empty($cur_peep['AccountId'])){
				$cur_id_account									= $cur_peep['AccountId'];
				$fam_peeps[$cur_id_account][]				= $cur_peep;
				
				if(empty($options[$cur_id_account])){
					$options[$cur_id_account]['has_served_on_cc_before']	 	= false;
					$options[$cur_id_account]['has_fostered_before'] 				= false;
				}
				
				
				if(!empty($cur_peep['Church__c'])){
					$peep_to_account[$cur_id_account]	 	= $cur_peep;
				}elseif(!isset($peep_to_account[$cur_id_account])){
					$peep_to_account[$cur_id_account]	 	= $cur_peep;
				}
				
				
			}
		}
	}
	
	/*
	print_array($fam_peeps);
	print_array($options);
	exit();
	*/
	
	if(!empty($accounts['errorCode'])){
		$r['result']						= 'error '.$accounts['errorCode'].' - '.$accounts['message'];
		$r['state']							= 3;
		return $r;
	}
		
	if(!empty($accounts['data'])){
		foreach($accounts['data'] AS $key => $val){
			if(!empty($val['Foster_family_status__c'])){
				$updated_record								= false;
				$has_fostered_before						= false;
				$has_served_on_cc_before				= false;
				$merge_fields									= array();
				$assign												= array();
				$fam												= array();
				$fam['id_salesforce']						= $val['Id'];
				$fam['family_name']						= $val['Name'];
				$fam['family_type']							= 'foster_family';
				$fam['date_sync']								= time();
				$cur_id_account								= $val['Id'];
				if(empty($val['sf_mod_last'])){
					$val['sf_mod_last']						= 0;
				}
				
				//Pull field maps
				$map_people		= $this->get_salesforce_serves_fields_map(array('scope' => 'people'));
				$map					= $this->get_salesforce_serves_fields_map(array('scope' => 'families'));
				if(!empty($map)){
					foreach($map as $key_sf => $key_ps){
						if(isset($val[$key_sf]) && !isset($fam[$key_ps])){
							$fam[$key_ps]			= $val[$key_sf];
						}
					}
				}
				
				//Assign Home Church
				if(!empty($peep_to_account[$cur_id_account]['Church__c'])){
					$fam['id_church_home']				= $this->churches_model->get_church_id_by_salesforce_id($people['assoc'][$cur_id_account]['Church__c']);
				}
				
				//Assign Recruiting Church
				if(!empty($val['LTP_Foster_Family_Recruiting_Church__c'])){
					$fam['id_church_recruited']				= $this->churches_model->get_church_id_by_salesforce_id($val['LTP_Foster_Family_Recruiting_Church__c']);
				}elseif(!empty($fam['id_church_home'])){
					$fam['id_church_recruited']				= $fam['id_church_home'];
				}
				
				
				//Fix start date
				if(strtotime($val['LTP_Partner_Join_Date__c']) > 0){
					$fam['date_start']							= strtotime($val['LTP_Partner_Join_Date__c']);
				}
				switch(strtolower($val['Foster_family_status__c'])){
					case 'closed':
						$fam['state']				= 24;
					break;
					case 'hold':
					case 'on hold':
						$fam['state']				= 22;
					break;
					case 'respite':
					case 'respite family':
						$fam['state']				= 35;
					break;
					case 'open':
						$fam['state']				= 30;
					break;
					case 'active placement':
					case 'active':
						$fam['state']				= 40;
					break;
					default:
						$fam['state']				= 10;
					break;
				}
				//Get current record in PS database
				$cur_object												= $this->families_model->get_family(array('id_salesforce' => $fam['id_salesforce']));
				
				//Save Family Record
				$fam['save_method']								= 'update_fallback_merge';
				$fam['date_src']										= $val['sf_mod_last'];
				$fam_results											= $this->families_model->save_family($fam);
				if($fam_results['result']){
					$r['result']											= 'success';
					$r['data'][]											= $fam_results;
					$r['records']++;
					if($r['state']	!= 3){
						$r['state']											= 4;	
					}
					$r['record_ids_processed'][]					= $fam_results['id_family'];
					$updated_record									= true;
				}else{
					$cur_object['skip_reason']					= $fam_results['debug'];
					$r['skipped_data'][]								= $cur_object;
					$r['records_skipped']++;	
					$r['state']												= 3;
					$r['record_ids_skipped'][]						= $cur_object['id_family'];
				}
			
				//Assign family to agency
				if(!empty($val['Foster_Family_Approving_Agency__c'])){
					unset($assign);
					$assign['id_family']								= $fam_results['id_family'];
					$assign['id_agency']								= $this->agencies_model->get_agency_id_by_salesforce_id($val['Foster_Family_Approving_Agency__c']);
					$assign['assignment_type']					= 'family_to_agency';
					$assign['save_method']						= 'newer';
					$assign['date_src']								= $val['sf_mod_last'];
					if(!empty($assign['id_family']) && !empty($assign['id_agency'])){
						$result_assign									= $this->website_model->save_assignment($assign);
						$results_assign[]								= $result_assign;
					}
				}

					
				//Assign foster parents
				if(!empty($fam_peeps[$cur_id_account])){
					foreach($fam_peeps[$cur_id_account] as $cur_fam_peep){
						$cur_fam_peep_assign												= array();
						$cur_fam_peep_save												= array();
						$cur_fam_peep_ps													= $this->people_model->get_person(array('id_salesforce' => $cur_fam_peep['Id']));
						
						//Save person if they do not exist
						if(empty($cur_fam_peep_ps['id_people']) && !empty($map_people)){
							foreach($map_people as $key_sf => $key_ps){
								if(isset($cur_fam_peep[$key_sf]) && !isset($cur_fam_peep_save[$key_ps])){
									$cur_fam_peep_save[$key_ps]				= $cur_fam_peep[$key_sf];
								}
							}
							if(!empty($cur_fam_peep_save)){
								$cur_fam_peep_save['date_src']				= $val['sf_mod_last'];
								$cur_fam_peep_save['save_method']		= 'update_fallback_merge';
								$cur_save													= $this->people_model->save_people($cur_fam_peep_save);
								$cur_fam_peep_ps									=	$cur_save['data'];
							}
						}

						if(!empty($cur_fam_peep_ps['id_people'])){
							
							$cur_fam_peep_assign['id_people']						= $cur_fam_peep_ps['id_people'];
							$cur_fam_peep_assign['id_family']						= $fam_results['id_family'];
							$cur_fam_peep_assign['id_role']							= 20;
							$cur_fam_peep_assign['assignment_type']			= 'people_to_family';
							$cur_fam_peep_assign['save_method']					= 'newer';
							$cur_fam_peep_assign['date_src']						= $val['sf_mod_last'];
							
							if(!empty($cur_fam_peep_ps['people_gender'])){
								switch(strtolower($cur_fam_peep_ps['people_gender'])){
									case 'male':
										$cur_fam_peep_assign['id_role']			= 5;
									break;
									case 'female':
										$cur_fam_peep_assign['id_role']			= 10;
									break;
								}
							}
							$results_assign[]												= $this->website_model->save_assignment($cur_fam_peep_assign);
						}
					}
				}
			}//End Has Foster Status
		}
	}
	
	if($r['state'] == 3 && !empty($r['records'])){
		$r['result']	= 'Completed with errors';
	}elseif($r['state'] == 3){
		$r['result']	= 'Error';
	}else{
		$r['result']	= 'Completed Successfully';
	}
	print_array($results_assign);
	print_array($r);
	exit();
	
	return $r;
}

function update_ps_communities_from_sf($vars){
	set_time_limit(600);
	$result									= array();
	$arr_contact_accounts			= array();
	$r 										= array('result' => 'running', 'state' => 1, 'records' => 0, 'records_skipped' => 0, 'record_ids_processed' => array(), 'record_ids_skipped' => array());
	//$vars['force_update']				= 1;
	//$vars['force_local_overwrite']	= 1;
	$coms										= $this->salesforce_model->get_care_communities($vars);	
	$contacts									= $this->salesforce_model->get_foster_parents($vars);	
	if(!empty($contacts)){
		foreach($contacts as $cur_contact){
			if(!empty($cur_contact['AccountId'])){
				$arr_contact_accounts[] = $cur_contact['AccountId'];
			}
		}
		$arr_contact_accounts			= array_unique($arr_contact_accounts);
	}
	
	if(!empty($coms['errorCode'])){
		$r['result']						= 'error '.$coms['errorCode'].' - '.$coms['message'];
		$r['state']							= 3;
		return $r;
	}	
	
	if(!empty($coms['data'])){
		foreach($coms['data'] AS $key => $val){
		//if($val['Id'] == '7010G000001AaQsQAK'){
			$result													= array();
			$assign													= array();
			$com['id_salesforce']							= $val['Id'];
			$com['community_name']					= $val['Name'];
			$com													=$this->salesforce_model->get_promise_id_from_care_community_name($com);
			$com['date_start']								= strtotime($val['StartDate']);
			$com['date_end']									= strtotime($val['EndDate']);

			switch(strtolower($val['Status'])){
				case 'completed':
					$com['state']				= 24;
					$peep_state					= 22;
				break;
				case 'open':
					$com['state']				= 30;
					$peep_state					= 22;
				break;
				case 'in progress':
					$com['state']				= 40;
					$peep_state					= 40;
				break;
				default:
					$com['state']				= 10;
					$peep_state					= 22;
				break;
			}
			$cur_object												= $this->communities_model->get_community(array('id_salesforce' => $com['id_salesforce']));

			echo '<p>'.$cur_object['community_name'].' '.$cur_object['date_mod'].' '.$val['sf_mod_last'].'</p>';
				
				
			$com['save_method']								= 'update_fallback_merge';
			$com['date_src']										= $val['sf_mod_last'];
			
			$result_com												= $this->communities_model->save_community($com);
			
			if($result_com['result']){
								
				//Assign Family to care community
				$assign['save_method']							= 'newer';
				$assign['date_src']									= $val['sf_mod_last'];
				$assign['id_community']							= $result_com['id_community'];
				$assign['id_family']									= $this->families_model->get_family_id_by_salesforce_id($val['Family_Household_Account__c']);
				$assign['assignment_type']						= 'family_to_community';
				if(!empty($assign['id_family'])){
					$result_assign										= $this->website_model->save_assignment($assign);
					$results_assign[]									= $result_assign;
				}
				unset($assign);
				
				//Assign church to care community
				$assign['save_method']						= 'newer';
				$assign['date_src']								= $val['sf_mod_last'];
				$assign['id_community']						= $result_com['id_community'];
				$assign['id_church']								= $this->churches_model->get_church_id_by_salesforce_id($val['Location__c']);
				$assign['assignment_type']					= 'community_to_church';

				if(!empty($assign['id_church'])){
					$result_assign									= $this->website_model->save_assignment($assign);
					$results_assign[]								= $result_assign;
				}
				unset($assign);
				
				//Assign family members to care community
				
				if(in_array($val['Family_Household_Account__c'], $arr_contact_accounts)){
					foreach($contacts as $cur_contact){
						unset($assign);
						if(!empty($cur_contact['Id']) && $cur_contact['AccountId'] == $val['Family_Household_Account__c']){
							$assign['id_people']									= $this->people_model->get_people_id_by_salesforce_id($cur_contact['Id']);
							$assign['id_role']										= 20;
							$assign['save_method']							= 'newer';
							$assign['date_src']									= $val['sf_mod_last'];
							$assign['id_community']							= $result_com['id_community'];
							$assign['assignment_type']						= 'people_to_community';
							if(!empty($assign['id_people'])){
								$result_assign										= $this->website_model->save_assignment($assign);
								$results_assign[]									= $result_assign;
								
								//Make sure they are also assigned to the family
								unset($assign['id_community']);
								$assign['id_family']								= $this->families_model->get_family_id_by_salesforce_id($val['Family_Household_Account__c']);
								$assign['assignment_type']					= 'people_to_family';
								$result_assign										= $this->website_model->save_assignment($assign);
								$results_assign[]									= $result_assign;
								
							}
						}
					}
				}elseif(!empty($val['Family_Household_Account__c'])){
					//If foster family isn't in contacts then force try to pull the contact information
					
					$retry_contacts											= $this->get_contacts(array('account_id' => $val['Family_Household_Account__c'], 'force_update' =>1, 'skip_session' => 1));

					if(!empty($retry_contacts['data'])){
						foreach($retry_contacts['data'] as $cur_contact){
							unset($assign);
							if(!empty($cur_contact['Id'])){
								$assign['id_people']									= $this->people_model->get_people_id_by_salesforce_id($cur_contact['Id']);
								$assign['id_role']										= 20;
								$assign['save_method']							= 'newer';
								$assign['date_src']									= $val['sf_mod_last'];
								$assign['id_community']							= $result_com['id_community'];
								$assign['assignment_type']						= 'people_to_community';

								if(!empty($assign['id_people'])){
									$result_assign										= $this->website_model->save_assignment($assign);
									$results_assign[]									= $result_assign;
									
									//Make sure they are also assigned to the family
									unset($assign['id_community']);
									$assign['id_family']								= $this->families_model->get_family_id_by_salesforce_id($val['Family_Household_Account__c']);
									$assign['assignment_type']					= 'people_to_family';
									$result_assign										= $this->website_model->save_assignment($assign);
									$results_assign[]									= $result_assign;
								}
							}
						}
					}
				}
				
				
				//Add & Assign Care Community Members
				$vols													= $this->get_campaign_members(array('campaign_id' => $val['Id']));
				$vol_map												= $this->get_salesforce_serves_fields_map(array('scope' => 'volunteer'));
		
				if(!empty($vols['data']) && !empty($vol_map)){
					foreach($vols['data'] as $cur_vol){
						unset($update_peep);
						
						foreach($vol_map as $sf_key => $ps_key){
							if(isset($cur_vol['Contact'][$sf_key])){
								$update_peep[$ps_key]			= $cur_vol['Contact'][$sf_key];
							}
						}				

					if(!empty($update_peep)){
						$update_peep['save_mode']			= 'update_fallback_merge';
						$update_peep['id_salesforce']		= $cur_vol['ContactId'];
						$update_peep['import_state']		= $peep_state;
						$update_peep['date_src']				= $val['sf_mod_last'];
						
						$result_peep								= $this->people_model->save_people($update_peep);
						$results_peeps[]							= $result_peep	;
						
						
						if(!empty($result_peep['id_people'])){
							unset($assign);
							$assign['save_method']						= 'newer';
							$assign['date_src']								= $cur_vol['sf_mod_last'];
							$assign['id_community']						= $result_com['id_community'];
							$assign['id_people']								= $result_peep['id_people'];
							$assign['assignment_type']					= 'people_to_community';
							
							switch(strtolower($cur_vol['Campaign_Member_Current_Role__c'])){
								case 'care team leader':
								case 'team leader':
								case 'team captain':
									$assign['id_role']				= 310;
								break;
								case 'child mentor':
									$assign['id_role']				= 320;
								break;
								case 'family helper':
									$assign['id_role']				= 330;
								break;
								case 'respite':
									$assign['id_role']				= 340;
								break;
								case 'volunteer':
									$assign['id_role']				= 100;
								break;
								default:
									$assign['id_role']				= 330;
								break;
							}
						
							$results_assign[]						= $this->website_model->save_assignment($assign);
						}
					}
				}
			}
				
				$results_com[]										= $result_com;
				$r['result']											= 'success';
				$r['data']['communities'][]					= $result_com;
				$r['data']['assigns'][]							= $result_assign;
				$r['records']++;
				if($r['state']	!= 3){
					$r['state']											= 4;	
				}
				
				$r['record_ids_processed'][]					= $result_com['id_community'];

			}else{
				
				$cur_object['skip_reason']					= $result_com['debug'];
				$r['skipped_data'][]								= $cur_object;
				$r['records_skipped']++;	
				$r['state']												= 3;
				$r['record_ids_skipped'][]						= $cur_object['id_community'];
				
			}
		}
		//exit();
		//}//Remove
	}
	
	if($r['state'] == 3 && !empty($r['records'])){
		$r['result']	= 'Completed with errors';
	}elseif($r['state'] == 3){
		$r['result']	= 'Error';
	}else{
		$r['result']	= 'Completed Successfully';
	}
	
	return $r;
}

function update_ps_volunteers_from_sf(){
	$result									= array();
	$r 											= array('result' => 'running', 'state' => 1, 'records' => 0, 'records_skipped' => 0, 'record_ids_processed' => array(), 'record_ids_skipped' => array());
	$vars['force_update']			= 1;
	$vols										= $this->salesforce_model->get_volunteers($vars);
	
	if(!empty($vols['errorCode'])){
		$r['result']						= 'error '.$vols['errorCode'].' - '.$vols['message'];
		$r['state']							= 3;
		return $r;
	}	
	
	foreach($vols['data'] AS $key => $val){
		$result									= array();
		$assign									= array();
		$peep										= array();
		/*
		$fam['id_salesforce']				= $val['family']['Id'];
		$fam['family_name']			= $val['family']['Name'];
		
		switch(strtolower($val['family']['Foster_family_status__c'])){
			case 'closed':
				$fam['state']					= 24;
			break;
			case 'open':
				$fam['state']					= 30;
			break;
			case 'active placement':
				$fam['state']					= 40;
			break;
			default:
				$fam['state']					= 5;
			break;
		}
		
		
		$result['fam']							= $this->families_model->save_family($fam);
		*/
		
		foreach($val['people'] as $cur_peep){
			$peep														= array();
			$peep['id_salesforce']								= $cur_peep['Id'];
			$peep['name_first']									= $cur_peep['FirstName'];
			$peep['name_last']									= $cur_peep['LastName'];
			$peep['people_email_primary']					= $cur_peep['Email'];
			$peep['address_street_1']						= $cur_peep['MailingStreet'];
			$peep['address_city']								= $cur_peep['MailingCity'];
			if(strlen($cur_peep['MailingState']) == 2){
				$peep['address_state']							= strtoupper($cur_peep['MailingState']);	
			}else{
				$peep['address_state']							= $cur_peep['MailingState'];
			}
			
			$peep['address_zip']							= $cur_peep['MailingPostalCode'];
			$peep['people_phone_mobile']				= $cur_peep['MobilePhone'];
			$peep['people_phone_home']				= $cur_peep['HomePhone'];
			$peep['state']										= $fam['state'];
			
			if(!empty($cur_peep['Birthdate'])){
				$peep['people_dob']							= strtotime($cur_peep['Birthdate']);
			}
			
			$cur_object											= $this->families_model->get_people_id_by_salesforce_id(array('id_salesforce' => $peep['id_salesforce']));
			if(empty($cur_object['date_mod']) || (!empty($cur_object['date_mod']) && $cur_object['date_mod'] <= $cur_peep['sf_mod_last'])){
				$result['peep']								= $this->people_model->save_people($peep);
				$assign['id_family']						= $result['fam']['id_family'];
				$assign['id_people']						= $result['peep']['id_people'];
				
				$assign['assignment_type']			= 'people_to_family';
				$assign['id_role']							= 18;	
				
				if(!empty($fam['family_name'])){
					$com_name						= explode(' ',str_replace(',','',str_replace('&', '',strtolower(trim($fam['family_name'], ' ')))));
					$com_length						= count($com_name);
					$name_hash						= preg_replace("/[^a-zA-Z]+/", "", strtolower(trim($peep['name_first'].$peep['name_last'], ' ')));
					$name_first_hash				= preg_replace("/[^a-zA-Z]+/", "", strtolower(trim($peep['name_first'], ' ')));
					$name_last_hash				= preg_replace("/[^a-zA-Z]+/", "", strtolower(trim($peep['name_last'], ' ')));
					$name_challenge				= array();
					foreach($com_name as $com_key => $com_val){
						$name_challenge[]		= preg_replace("/[^a-zA-Z]+/", "", strtolower(trim($com_name[0].$com_val, ' ')));
						if(!empty($com_name[1])){
							$name_challenge[]		= preg_replace("/[^a-zA-Z]+/", "", strtolower(trim($com_name[1].$com_val, ' ')));
						}
						if(!empty($com_name[2])){
							$name_challenge[]		= preg_replace("/[^a-zA-Z]+/", "", strtolower(trim($com_name[2].$com_val, ' ')));	
						}
						
					}
					
					if(in_array($name_hash, $name_challenge)){
						$parent_match						= true;
						$assign['id_role']						= 20;	
					}
				}

				$result['assign']								= $this->people_model->save_assignment($assign);
				$r['record_ids_processed'][]			= $result['peep']['id_people'];
				
			}else{
				
				$cur_object['skip_reason']						= 'PS Record Newer';
				$r['skipped_data'][]									= $cur_object;
				$r['records_skipped']++;				
				$r['record_ids_skipped'][]					= $cur_object['id_people'];
			}

		}//End Foreach Loop
		
		$results[]											= $result;
	}
	
	if($r['state'] == 3 && !empty($r['records'])){
		$r['result']	= 'Completed with errors';
	}elseif($r['state'] == 3){
		$r['result']	= 'Error';
	}else{
		$r['result']	= 'Completed Successfully';
	}
	
	return $r;
}//End Function


/*
function update_sf_volunteers_from_ps($vars){
	$result										= array();
	$r 												= array('result' => 'running', 'state' => 1, 'records' => 0, 'records_skipped' => 0);
	$peeps										= $this->people_model->get_people($vars);
	$id_people									= null;
	$arr_contacts_in_household		= array();
	$parent_types							= array('foster_mom', 'foster_dad', 'foster_parent');				
	
	if(!empty($peeps[0]['id_people'])){
		foreach($peeps as $cur){
			
			if(!empty($cur['id_people'])){
				$id_family					= $cur['id_people'];
			}
			
			//********* Add / Update People / Foster Parents (Contacts)		
			$parent_types				= array('foster_mom', 'foster_dad', 'foster_parent');			
			
			foreach($parent_types as $parent_type){
				if(!empty($cur[$parent_type]['id_people'])){
					$id_contact																			= null;
					$call																					= array();
					$call['post_fields']['Primary_Contact__c']						= false;
					foreach($cur[$parent_type] as $key => $val){
						$cur_val			= '';
						
						if(isset($val) && !empty($key) && strlen($key) > 1){
							$cur_sf_key																= $this->salesforce_model->get_sf_key_from_ps_key(array('key' => $key, 'scope' => 'contact'));	
							$cur_val																		= $this->salesforce_model->get_sf_val_from_ps_val(array('key' => $key, 'val' => $val, 'scope' => 'contact'));	
							if(!empty($cur_sf_key) && !empty($cur_val)){
								$call['post_fields']	[$cur_sf_key]							= $cur_val;
							}
						}
					}
					
					if($cur['id_people_primary'] == $cur[$parent_type]['id_people']){
						$call['post_fields']['Primary_Contact__c']					= true;
					}
					
					$call['post_fields']['RecordTypeId']									= '012F0000000jkmjIAA'; //Contact RecordType
					$call['post_fields']['AccountId']											= $id_family_salesforce;
					$call['call_type']																	= 'post';
					$call['call_object']																= 'Contact';
					$resp['contact'][$parent_type]											= $this->salesforce_model->curl_call($call);
					
					if(!empty($resp['contact'][$parent_type]['id']) && empty($call['post_fields']['id'])){
						$id_people_salesforce													= $resp['contact'][$parent_type]	['id'];
						$arr_contacts_in_household[]										= $id_people_salesforce;
						if(empty($call['post_fields']['Id'])){
							$result['people'][$parent_type]								= $this->people_model->save_people(array('id_people' => $cur[$parent_type]['id_people'], 'id_salesfoce' => $id_people_salesforce));	
						}
						if($cur['id_people_primary'] == $cur[$parent_type]['id_people']){
							$primary_id_salesforce												=  $id_people_salesforce;
						}
						$resp['debug']['contact'][$id_people_salesforce]		= $call;
					}
				}
			}
		}//End Foreach Loop 
	}//End If
}//End Function

*/

function update_sf_families_from_ps($vars){
	$result											= array();
	$r 												= array('result' => '', 'records' => 0);
	$fams											= $this->families_model->get_edit_family_data($vars);
	$id_family										= null;
	$id_community 							= null;
	$primary_name							= null;
	$primary_email								= null;
	$primary_id_salesforce				= null;
	$arr_contacts_in_household		= array();
	$parent_types								= $this->families_model->get_foster_parent_types_array();
	$errors										= array();
	$errors_human							= array();
	$p												= 0;
	$has_mom									= false;
	$has_dad										= false;
	$has_parent									= false;
	$default_primary_parent_type 		= 'foster_mom';
	
	
	if(!empty($fams['id_family'])){
		$new		= $fams;
		unset($fams);
		$fams[0]	= $new;
	}
	
	
	if(!empty($fams[0]['id_family'])){
		foreach($fams as $cur){
			if(!empty($cur['id_family'])){
				$id_family					= $cur['id_family'];
			}
			
			if(!empty($cur['id_community'])){
				$id_community		= $cur['id_community'];	
			}
			
			//********* Find Primary Contacts
			foreach($parent_types as $parent_type){
				if(!empty($cur[$parent_type]['id_people'])){
					if($parent_type == 'foster_mom'){
						$has_mom		= true;
					}
					if($parent_type == 'foster_dad'){
						$has_dad			= true;
					}
					if($parent_type == 'foster_parent'){
						$has_parent		= true;
					}
				}
			}
			
			if($has_mom){
				$default_primary_parent_type = 'foster_mom';
			}elseif($has_dad){
				$default_primary_parent_type = 'foster_dad';
			}elseif($has_parent){
				$default_primary_parent_type = 'foster_parent';
			}
			
			foreach($parent_types as $parent_type){
				if(!empty($cur[$parent_type]['id_people'])){
					if((empty($cur['id_people_primary']) && $parent_type == $default_primary_parent_type) || (!empty($cur['id_people_primary']) && $cur['id_people_primary'] == $cur[$parent_type]['id_people'])){
						$cur['id_people_primary']								= $cur[$parent_type]['id_people'];
						$primary_name											= $cur[$parent_type]['name_first'].' '.$cur[$parent_type]['name_last'];
						$primary_email												= $cur[$parent_type]['people_email'];
						$primary_id_salesforce								= $cur[$parent_type]['id_salesforce'];
					}
				}
			}

			//********* Add / Update Household (Account)
			$call																		= array();
			if(!empty($vars['post_fields'])){
				$call['post_fields']												= $vars['post_fields'];
			}
			
			
			$cur_fam																= $this->families_model->get_family(array('id_family' => $id_family));
			
			foreach($cur_fam as $key => $val){
				$cur_val			= 	'';
				if(isset($val) && !empty($key) && strlen($key) > 1){
					$cur_sf_key														= $this->salesforce_model->get_sf_key_from_ps_key(array('key' => $key, 'scope' => 'family'));	
					$cur_val															= $this->salesforce_model->get_sf_val_from_ps_val(array('key' => $key, 'val' => $val, 'scope' => 'family'));	
					if(!empty($cur_sf_key) && !empty($cur_val)){
						$call['post_fields']	[$cur_sf_key]					= $cur_val;
					}
				}
			}
			
			if(!empty($cur_fam['id_salesforce'])){
				$call['post_fields']['Id']																	= $cur_fam['id_salesforce'];
			}
			$call['post_fields']['RecordTypeId']													= '012F00000016KaeIAE'; //Household Account RecordType
			$call['call_type']																				= 'post';
			$call['call_object']																				= 'Account';
			//$call['post_fields']['Does_or_has_had_a_foster_placement__c']		= true;
			
			if(!empty($primary_id_salesforce)){
				$call['post_fields']['npe01__One2OneContact__c']						= $primary_id_salesforce;			
			}
			
			if(!empty($primary_email)){
				$call['post_fields']['Email_of_Primary_Contact__c']						= $primary_email;
				$call['post_fields']['Primary_Household_Member_Email__c']			= $primary_email;	
			}
			
			
			$resp['household']																			= $this->salesforce_model->curl_call($call);
			$resp['debug']['household']																= $call;
			
			if(!empty($resp['household'][0]['errorCode'])){
				$errors_human[]		= 'Family '.$id_family.': '.$resp['household'][0]['errorCode'];
			}
			
			
			if(!empty($resp['household']['id'])){
				$id_family_salesforce																	= $resp['household']['id'];
				if(empty($call['post_fields']['Id'])){
					$result['family']																			= $this->families_model->save_family(array('id_family' => $id_family, 'id_salesfoce' => $id_family_salesforce, 'date_sync' => time()));	
				}
			
				//********* Add / Update People / Foster Parents (Contacts)		
				foreach($parent_types as $parent_type){
					if(!empty($cur[$parent_type]['id_people'])){
						$id_contact																			= null;
						$ptype_id																				= $p.'_'.$parent_type;
						$con_call																				= array();
						//$con_call['post_fields']['Primary_Contact__c']						= false;
						if($cur['id_people_primary'] == $cur[$parent_type]['id_people']){
							$con_call['post_fields']['Primary_Contact__c']					= true;
						}
						$con_call['post_fields']['RecordTypeId']								= '012F0000000jkmjIAA'; //Contact RecordType
						$con_call['post_fields']['AccountId']										= $id_family_salesforce;
						$id_people																			= $cur[$parent_type]['id_people'];
						$con_call['id_people']															= $id_people;
						
						$resp['contact'][$ptype_id][$id_people]								= $this->update_sf_contacts_from_ps($con_call);
						
						if(!empty($resp['contact'][$ptype_id][$id_people][0]['errorCode'])){
							$errors_human[]		= 'People '.$id_people.': '.$resp['contact'][$parent_type][$id_people][0]['errorCode'];
						}
						
						$p++;
					}
				}
			}
		}//End Foreach Loop 
	
		if(!empty($errors_human) && count($errors_human) > 0){
			$resp['response']				= 'error';
			$resp['errors_human']		= $errors_human;
		}else{
			$resp['response']				= 'success';
		}
			
		return $resp;
		
	}//End If	
}//End Function


function update_sf_communities_from_ps($vars){
	$result											= array();
	$r 												= array('result' => '', 'records' => 0);
	$vars['force_update']					= 1;
	$coms											= $this->communities_model->get_edit_community_data($vars);
	$id_family										= null;
	$id_community 							= null;
	$primary_name							= null;
	$primary_email								= null;
	$primary_id_salesforce				= null;
	$arr_contacts_in_household		= array();
	$parent_types								= array('foster_mom', 'foster_dad', 'foster_parent');
	$mom_as_primary						= false;

	if(!empty($coms['id_community'])){
		$new		= $coms;
		unset($coms);
		$coms[0]	= $new;
	}
	
	
	
	if(!empty($coms[0]['id_community'])){
		foreach($coms as $cur){
			if(!empty($cur['id_family'])){
				$id_family					= $cur['id_family'];
			}
			
			if(!empty($cur['id_community'])){
				$id_community		= $cur['id_community'];	
			}
			
			//********* Find Primary Contacts
			foreach($parent_types as $parent_type){
				if(!empty($cur[$parent_type]['id_people'])){
					if((empty($cur['id_people_primary']) && $parent_type == 'foster_mom') || (!empty($cur['id_people_primary']) && $cur['id_people_primary'] == $cur[$parent_type]['id_people'])){
						$cur['id_people_primary']								= $cur[$parent_type]['id_people'];
						$primary_name											= $cur[$parent_type]['name_first'].' '.$cur[$parent_type]['name_last'];
						$primary_email												= $cur[$parent_type]['people_email'];
						$primary_id_salesforce								= $cur[$parent_type]['id_salesforce'];
					}
				}
			}

			//********* Add / Update Household (Account)
			$call																									= array();
			$call['id_family']																				= $id_family;
			
			if(!empty($primary_id_salesforce)){
				$call['post_fields']['npe01__One2OneContact__c']						= $primary_id_salesforce;			
			}
			
			if(!empty($primary_email)){
				$call['post_fields']['Email_of_Primary_Contact__c']						= $primary_email;
				$call['post_fields']['Primary_Household_Member_Email__c']			= $primary_email;	
			}
			
			
			
			$resp																						= $this->update_sf_families_from_ps($call);
			//print_array($resp);
			if(!empty($resp['household']['id'])){
			
				//********* Add / Update Care Community (Campaign)
				$call																								= array();
				foreach($cur as $key => $val){
					$cur_val			= 	'';
					
					if(isset($val) && !empty($key) && strlen($key) > 1){
						$cur_sf_key															= $this->salesforce_model->get_sf_key_from_ps_key(array('key' => $key, 'scope' => 'community'));	
						$cur_val																= $this->salesforce_model->get_sf_val_from_ps_val(array('key' => $key, 'val' => $val, 'scope' => 'community'));	

						if(!empty($cur_sf_key) && !empty($cur_val)){
							$call['post_fields']	[$cur_sf_key]						= $cur_val;
						}
					}
				}

				$call['post_fields']['RecordTypeId']								= '012F0000000jkmZIAQ'; //Campaign
				$call['post_fields']['IsActive'] 										= true;
				$call['post_fields']['Type'] 												= 'Care Team Group';
				$call['post_fields']['Name'] 											= $this->salesforce_model->get_sf_care_community_name($cur);
				$call['call_type']															= 'post';
				$call['call_object']															= 'Campaign';
				if(!empty($primary_id_salesforce)){
					$call['post_fields']['Primary_Contact__c']					= $primary_id_salesforce;			
				}
				if(!empty($primary_name)){
					$call['post_fields']['Primary_Contact_Name__c']		= $primary_name;			
				}
				if(!empty($primary_email)){
					$call['post_fields']['Email_of_Primary_Contact__c']	= $primary_email;
				}
				$resp['campaign']														= $this->salesforce_model->curl_call($call);
				$resp['debug']['campaign']											= $call;
				
				if(!empty($resp['campaign']['id'])){
					$id_community_salesforce										= $resp['campaign']['id'];
					$result['community']												= $this->communities_model->save_community(array('id_community' => $id_community, 'id_salesfoce' => $id_community_salesforce, 'date_sync' => time()));	
				}
				
				print_array($result);
				print_array($resp);
			}
		}//End Foreach Loop 
	}//End If
}//End Function


function update_sf_contacts_from_ps($vars){
	$result											= array();
	$r 												= array('result' => 'running', 'state' => 1, 'records' => 0, 'records_skipped' => 0);
	$vars['with_assignments']			= 1;
	$has_volunteer_status					= false;
	$peeps											= $this->people_model->get_people($vars);
	$id_people									= null;
	$id_people_salesforce					= null;
	$arr_roles_advocates					= array(710,720);
	$arr_roles_volunteers					= array(100,220,310,320,330,340);
	$arr_roles_mentors						= array(320);
	$arr_roles_parents						= array(5,10,15);
	
	if(!empty($peeps[0]['id_people'])){
		foreach($peeps as $cur){
			$call																						= array();	
			if(!empty($cur['id_people'])){
				$id_people																		= $cur['id_people'];
			}
			if(!empty($cur['id_salesforce'])){
				$id_people_salesforce														= $cur['id_salesforce'];
			}
			
			//Set the contact post variables being passed
			if(!empty($vars['post_fields'])){
				$call['post_fields']																= $vars['post_fields'];
			}
			
			
			$id_contact																			= null;
			$errors																				= array();
			$errors_human																	= array();
			$id_people																			= $cur['id_people'];
			//$call['post_fields']['LeadAdvocate__c']								=	false;
			$call['post_fields']['Volunteer__c']											= false;
			//$call['post_fields']['Tier_2_Volunteer__c']							= false;
			/*
			if(!empty($id_people_salesforce)){
				$call['post_fields']['Id']												= $id_people_salesforce;	
			}
			*/
			/*
			if(empty($call['post_fields']['Primary_Contact__c']) && !empty($cur['id_people_primary']) && $cur['id_people_primary'] == $cur[$parent_type]['id_people']){
				$call['post_fields']['Primary_Contact__c']					= true;
			}else{
				//$call['post_fields']['Primary_Contact__c']					= false;	
			}
			*/
			
			foreach($cur['assigned'] as $cur_assign){
				if($cur_assign['assign_state'] > 0 && in_array($cur_assign['id_role'], $arr_roles_advocates)){
					//$call['post_fields']['LeadAdvocate__c']					=	 true;
					$call['post_fields']['Advocate_Team__c']					=	 true;
					$has_volunteer_status												= true;
				}
				if($cur_assign['assign_state'] > 0 && in_array($cur_assign['id_role'], $arr_roles_volunteers)){
					$call['post_fields']['Volunteer__c']								=	 true;
					$has_volunteer_status												= true;
				}
				if($cur_assign['assign_state'] > 0 && in_array($cur_assign['id_role'], $arr_roles_mentors)){
					//$call['post_fields']['Tier_2_Volunteer__c']				=	 true;
					$has_volunteer_status												= true;
				}
			}
			
			if($has_volunteer_status){		
				switch($cur['state']){
					case 40:
						$call['post_fields']['GW_Volunteers__Volunteer_Status__c']		=	 'Active';
					break;
					case 30:
						$call['post_fields']['GW_Volunteers__Volunteer_Status__c']		=	 'prepared_waiting';
					break;
					case 24:
						$call['post_fields']['GW_Volunteers__Volunteer_Status__c']		=	 'no_longer_serving';
					break;
					case 22:
						$call['post_fields']['GW_Volunteers__Volunteer_Status__c']		=	 'taking_break';
					break;
					case 20:
						$call['post_fields']['GW_Volunteers__Volunteer_Status__c']		=	 'needs_training';
					break;
					case 10:
						$call['post_fields']['GW_Volunteers__Volunteer_Status__c']		=	 'Prospective';
					break;
				}
			}
			
			foreach($cur as $key => $val){
				$cur_val			= '';
				
				if(isset($val) && !empty($key) && strlen($key) > 1){
					$cur_sf_key																= $this->salesforce_model->get_sf_key_from_ps_key(array('key' => $key, 'scope' => 'contact'));	
					$cur_val																	= $this->salesforce_model->get_sf_val_from_ps_val(array('key' => $key, 'val' => $val, 'scope' => 'contact'));	
					if(!empty($cur_sf_key) && !empty($cur_val)){
						$call['post_fields']	[$cur_sf_key]							= $cur_val;
					}
				}
			}

			if(!empty($cur['id_salesforce'])){
				$call['post_fields']['Id']													= $cur['id_salesforce'];
			}			
			$call['post_fields']['RecordTypeId']									= '012F0000000jkmjIAA'; //Contact RecordType
			$call['call_type']																= 'post';
			$call['call_object']																= 'Contact';
			$call['id_promise_serves']													= $id_people;
				

			$resp['contact'][$id_people]												= $this->salesforce_model->curl_call($call);

					
			if(!empty($resp['contact'][$id_people]['id']) && empty($call['post_fields']['id'])){
				$id_people_salesforce													= $resp['contact'][$id_people]['id'];
				$arr_contacts_in_household[]										= $id_people_salesforce;
				if(empty($call['post_fields']['Id'])){
					$result['people'][$id_people]										= $this->people_model->save_people(array('machine_post' => 1, 'id_people' =>$id_people, 'id_salesforce' => $id_people_salesforce, 'date_sync' => time()));	
				}
				/*
				if($cur['id_people_primary'] == $cur[$parent_type]['id_people']){
					$primary_id_salesforce												=  $id_people_salesforce;
				}
				*/
				$resp['debug']['contact'][$id_people_salesforce]			= $call;
			}
			
			if(!empty($resp['contact'][$id_people][0]['errorCode'])){
				$errors_human[]															= 'People '.$id_people.': '.$resp['contact'][$id_people][0]['errorCode'];
			}

		}//End Foreach Loop 

		if(!empty($errors_human) && count($errors_human) > 0){
			$resp['response']																= 'error';
			$resp['errors_human']														= $errors_human;
		}else{
			$resp['response']																= 'success';
		}
		
		return $resp;
		
	}//End If
}//End Function


function can_affiliate_sync($vars=NULL){
	
	if(!empty($_SERVER['SERVER_NAME']) && strtolower($_SERVER['SERVER_NAME']) == 'localhost'){
		//return false;
	}
	
	return false;
	
	//return true;
}
 
}//End Class
?>
