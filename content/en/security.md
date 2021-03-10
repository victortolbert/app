<?php
Class Security_model extends CI_Model{
 
 function user_has_access($vars){
	 $id_affiliate		= $this->affiliates_model->get_active_affiliate_id();
	 
		
	 if(!empty($vars['id_people'])){
		$user 			= array('id_people' => $vars['id_people']);
	 }elseif(!empty($_SESSION['logged_in']['id_people']) && !empty($_SESSION['user']['id_people'])){
		 if($_SESSION['logged_in']['id_people'] != $_SESSION['user']['id_people']){
			$user						= $this->website_model->get_user_session(array('id_people' => $_SESSION['logged_in']['id_people']));

			if(empty($user['access_levels'][$id_affiliate]['scopes']['global']['access_level'])){
				$user['access_levels']		= $this->get_user_access_levels($user);
			}
		 }else{
			$user			= $this->website_model->get_user_session();
		 }
	 }elseif(!empty($_SESSION['logged_in'])){
		$user			= $this->website_model->get_user_session();
	 }
	 
	 if(!is_array($vars)){
		 $new								= $vars;
		 unset($vars);
		 $vars['access_level']				= $new;
	 }
	
	 
	 if(empty($user['access_levels']) && !empty($user['id_people'])){
		 $user['access_levels']		= $this->get_user_access_levels($user);
	 }
	 
	 if(!empty($user['access_levels'])){
		//Check to see if a global access level applies first
		if(empty($vars['scope'])){
			if($user['access_levels'][$id_affiliate]['scopes']['global']['access_level'] >= $vars['access_level']){
				return true;
			}
		}else{
			//Check for object access level is required
			$cur_scope				= $vars['scope'];
			if(!empty($user['access_level'][$id_affiliate]['scopes'][$cur_scope]['access_level'])){
				if($user['access_level'][$id_affiliate]['scopes'][$cur_scope]['access_level'] > $vars['scope']){
					return true;
				}
			}
		}
	 }
	 
	 
	 return false;
 }
 
 function get_user_access_levels($user=NULL){
	$user				= format_array_vals($user, 'id_people');
	
	if(!empty($user['id_people']) && $user['id_people'] == 1){
		return null;
	}
	
	if(!empty($user['id_people']) && empty($user['people_email_primary'])){
		$user			= $this->people_model->get_person(array('id_people' => $user['id_people']));
	}

	if(empty($user)){
		$user 			= $this->website_model->get_user_session();
	}

	 
	$access				= array();
	$id_affiliate		= $this->affiliates_model->get_active_affiliate_id();
	$assigns			= $this->people_model->get_assignments(array('id_people' => $user['id_people'], 'debug' => 0));
	
	$scopes			= array('affiliates', 'staff', 'agencies', 'churches', 'advocates', 'families', 'communities', 'volunteers', 'prospects', 'community_volunteer', 'community_family', 'advocate');
	
	$access[$id_affiliate]['scopes']['global']['access_level']			= 0;
	 
	 foreach($scopes as $cur){
		 $access[$id_affiliate]['scopes'][$cur]['access_level']		= 0;
	 }
	 
	 
	 if(!empty($assigns)){
		foreach($assigns as $cur){
			$cur_scope																							= $cur['role_scope'];
			
			//TODO: Fix when affiliate assignment migrations are completed
			//$cur_id_affiliate																					= $cur['id_affiliate'];
			$cur_id_affiliate																			 		= $id_affiliate;
			 $access[$cur_id_affiliate]['scopes'][$cur_scope]['access_level']			= $cur['role_permissions'];
			 if($cur['role_permissions'] > $access[$cur_id_affiliate]['scopes']['global']['access_level']	){
				 $access[$cur_id_affiliate]['scopes']['global']['access_level']							= $cur['role_permissions'];
				 $access[$cur_id_affiliate]['scopes']['global']['scope_inherit']							= $cur['role_scope'];
				 $access[$cur_id_affiliate]['scopes']['global']['scope_segment_inherit']			= $cur['role_scope_segment'];
				 $access[$cur_id_affiliate]['scopes']['global']['scope_limits']							= array('role_scope' => '', 'scope_ids' =>array());
				 if($cur['role_permissions'] < 60){
					 $access[$cur_id_affiliate]['scopes']['global']['scope_limits']['role_scope']	= 'communities';
					 $access[$cur_id_affiliate]['scopes']['global']['scope_limits']['scope_ids']		= $this->people_model->get_persons_active_care_community_ids($user['id_people']);
				 }
			 }
		}	 		
	 }
	 
	$_SESSION['logged_in']['access_levels']			= $access;
	
	return $access;
	 
 }
 
 function has_scope_limits(){
	 $cur_id_affiliate = $this->affiliates_model->get_active_affiliate_id();
	 if(!empty($_SESSION['logged_in']['access_levels'][$cur_id_affiliate]['scopes']['global']['scope_limits']['scope_ids'])){
		return true;
	 }
	 return false;
 }
 
 function get_scope_limit_role($vars=null){
	 
	 if(!empty($vars['access_levels'])){
		foreach($vars['access_levels'] as $cur){
			if(!empty($cur['scopes']['global']['scope_limits']['role_scope'])){
				return $cur['scopes']['global']['scope_limits']['role_scope'];
			}
		}
	 }
	 
	 $cur_id_affiliate = $this->affiliates_model->get_active_affiliate_id();
	 if(!empty($_SESSION['logged_in']['access_levels'][$cur_id_affiliate]['scopes']['global']['scope_limits']['role_scope'])){
		return $_SESSION['logged_in']['access_levels'][$cur_id_affiliate]['scopes']['global']['scope_limits']['role_scope'];
	 }
	 return null;
 }
 
 function get_scope_limit_role_ids($vars=null){
	 
	if(!empty($vars['access_levels'])){
		foreach($vars['access_levels'] as $cur){
			if(!empty($cur['scopes']['global']['scope_limits']['scope_ids'])){
				return $cur['scopes']['global']['scope_limits']['scope_ids'];
			}
		}
	}
	 
	 $cur_id_affiliate = $this->affiliates_model->get_active_affiliate_id();
	 if(!empty($_SESSION['logged_in']['access_levels'][$cur_id_affiliate]['scopes']['global']['scope_limits']['scope_ids'])){
		return $_SESSION['logged_in']['access_levels'][$cur_id_affiliate]['scopes']['global']['scope_limits']['scope_ids'];
	 }
	 return array();
 }
 
 function get_highest_global_access_level($vars=null){
	 
	 $access_level	= 0;
	 
	if(!empty($vars['access_levels'])){
		foreach($vars['access_levels'] as $cur){
			if(!empty($cur['scopes']['global']['access_level'])){
				if($cur['scopes']['global']['access_level'] > $access_level){
					$access_level = $cur['scopes']['global']['access_level'];
				}
			}
		}
	}
	 
	
	 return $access_level;
 }
 
 function secure_resource($vars){
	$arr_bypass								= array('/logout');
	$id_affiliate							= $this->affiliates_model->get_active_affiliate_id();
	$bypass									= false;
	foreach($arr_bypass as $cur){
		if(stripos($cur, $_SERVER['REQUEST_URI']) !== false){
			$bypass = true;
		}
	}
	
	if(!$bypass){
		$cookie_login							= $this->security_model->get_login_session_cookie();
	}
	
	
		
	 if(!empty($_SESSION['logged_in'])){
		$user								= $_SESSION['logged_in'];
		if(!empty($this->people_model->get_force_logout_status($user))){
			redirect(base_url().'logout?forced_logout=1');
		}
	 }
	 
	if(!is_array($vars)){
		$new								= $vars;
		unset($vars);
		if(is_numeric($new)){
			$vars['access_level']			= $new;
		}else{
			$vars['validator']				= $new;
		}
	}
	

	 
	if(!empty($vars['validator'])){
		$validator		= false;
		switch(strtolower($vars['validator'])){
			case 'has_portal_access':
				$validator = $this->user_has_portal_access();
			break;
			default:
				$validator = true;
			break;
		}
		if(!$validator){
			redirect(base_url().'home/forbidden?src='.$_SERVER['REQUEST_URI']);
		}
	}

	if($this->has_valid_serves_key()){
		return true;
	}elseif(empty($_SESSION['logged_in']['id_people'])){
		redirect(base_url().'login?r='.$this->website_model->save_post_login_redirect_info());
	}elseif(!$this->user_has_access($vars)){
		redirect(base_url().'home/forbidden?src='.$_SERVER['REQUEST_URI']);
	}
	
	return true;
 }

 function secure_affiliate_object($vars){
	 $resource_id_affiliaite		= null;
	 $redirect							= base_url().'home/forbidden';
	 
	 if(!empty($vars['role_scope'])){
		 $redirect						.= '?r='.url_enc(base_url().$vars['role_scope'].'/viewlist').'&unauth_type=affiliate_mismatch';
	 }
	 
	 if(empty($vars['no_data_no_redirect']) && empty($vars['id_affiliate']) && empty($vars['assign_id_affiliate'])){
		  redirect($redirect);
	 }
	 
	if($this->has_valid_serves_key()){
		return true; 
	}
	
	if($this->security_model->user_has_access(95)){
		return true;
	}
	
	if(!empty($vars['id_affiliate'])){
		$resource_id_affiliaite		= $vars['id_affiliate'];
	}elseif(!empty($vars['assign_id_affiliate'])){
		$resource_id_affiliaite		= $vars['id_affiliate'];
	}
	
	if(empty($resource_id_affiliaite)){
		return true;
	}
	
	 $id_affiliate							= $this->affiliates_model->get_active_affiliate_id();
	 
	 if($id_affiliate == $resource_id_affiliaite){
		 return true;
	 }
	
	 redirect($redirect);
 }
 
 function has_valid_serves_key(){
	 $post 			= $this->input->post();
	 $got			= $this->input->get();
	  $request		= null;
	  $time			= 0;
	  //print_array($_SERVER);
	 
	 if(!empty($post)){
		 $request = $post;
	 }elseif(!empty($got)){
		 $request = $got;
	 }
	 
	 if(!empty($request['serveskey'])){
		 $key			= json_decode(url_dec($request['serveskey']), true);
		 if(isset($key['time'])){
			  $time			= $key['time'];
		 }
	 }
	 
	 $diff 		= time()  - $time;
	if($diff < 600){
		return true;
	}
	
	return false;
 }
 
 
 function make_serves_key(){
	  $arr['redirect']		= null;
	 if(!empty($_SERVER['REDIRECT_URL'])){
		 $arr['redirect']		= $_SERVER['REDIRECT_URL'];
	 }
	
	 $arr['time']			= time();
	 
	 return url_enc(json_encode($arr));
 }
 
 
 function warn_ip(){
	$ip 	= $_SERVER['REMOTE_ADDR'];
	if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)) {
		$ip = array_pop(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']));
	}
	if(empty($_SESSION['security']['warned_ips'][$ip])){
		$_SESSION['security']['warned_ips'][$ip] = 1;
	}else{
		$_SESSION['security']['warned_ips'][$ip]++;
	}
	
	return $_SESSION['security']['warned_ips'][$ip];
		
 }
 
 function has_signed_role_agreement($vars=null){
	if(!empty($_SESSION['logged_in'])){
		$user				= $_SESSION['logged_in'];
		$id_affiliate		= $_SESSION['affiliate']['id_affiliate'];
		$orig_url 			= $this->session->userdata('original_url');
		if(empty($vars['redirect_base'])){
			$vars['redirect_base']	= base_url();
		}
		$session_msg		= '<div class="alert alert-success text-center center-block">Please sign this agreement before continuing.</div>';
		if(!empty($vars['redirect'])){
			$orig_url		= $vars['redirect'];
		}
		
		if(!empty($user['access_levels'][$id_affiliate]['scopes'])){
			$arr_scope		= array('advocate' => 'advocate', 'volunteer' => 'volunteers', 'family' => 'families', 'staff'=>'staff');
						
			//Check Global scope first
			foreach($arr_scope AS $type => $cur_scope){
				if($cur_scope == $user['access_levels'][$id_affiliate]['scopes']['global']['scope_inherit']){
					if(empty($user['agree_'.$type.'_sign_date'])){
						if(empty($vars['skip_redirect'])){
							$this->session->set_flashdata('msg',$session_msg);
							if(isset($orig_url)){
								redirect($vars['redirect_base'].'form/'.$type.'agreement?r='.url_enc($orig_url), 'refresh');
							}else{
								redirect($vars['redirect_base'].'form/'.$type.'agreement?r='.url_enc(base_url().'dashboard'), 'refresh');
							}
						}
					}
				}
			}
			
			//Check remaining scope matches
			foreach($arr_scope AS $type => $cur_scope){
				if(!empty($user['access_levels'][$id_affiliate]['scopes'][$type]['access_level'])){
					if(key_exists('agree_'.$type.'_sign_date', $user)){
						if(empty($user['agree_'.$type.'_sign_date'])){
							if(empty($vars['skip_redirect'])){
								$this->session->set_flashdata('msg',$session_msg);
								if(isset($orig_url)){
									redirect($vars['redirect_base'].'form/'.$type.'agreement?r='.url_enc($orig_url), 'refresh');
								}else{
									redirect($vars['redirect_base'].'form/'.$type.'agreement?r='.url_enc(base_url().'dashboard'), 'refresh');
								}
							}
						}
					}
				}
			}
		} 
	}
	return false;
 }	
 
 function has_gdpr_cookie(){
	 $cookie_name		= $this->get_gdpr_cookie_name();
	 
	if(isset($_COOKIE[$cookie_name])) {
		return true;
	}
	
	return false;
 }
 
 function get_gdpr_cookie_name(){
	if(!empty($_SESSION['affiliate']['affiliate_subdomain'])){
		$cookie_name	= $_SESSION['affiliate']['affiliate_subdomain'].'_promiseserves_org-gdpr-agree';
	}else{
		$cookie_name	= 'promiseserves_org-gdpr-agree';
	}
	
	
	return $cookie_name;
	 
 }
 
  function set_gdpr_cookie_accept(){
	$domain					= null;
	$cookie_name 			= $this->get_gdpr_cookie_name();
	$expire					= time() + (86400 * 365);
	if(!is_localhost()){
		$domain = '.promiseserves.org';
	}
	
	$r = setcookie($cookie_name, time(), $expire, "/", $domain);
	
	return $r;
	 
 }

 function set_login_session_cookie($id_people=null){
	$r 						= null;
	$domain					= null;
	$cookie_name 			= $this->get_login_cookie_name();
	$expire					= time() + (86400 * 90);

	if(!is_localhost()){
		$domain = '.promiseserves.org';
	}
	
	if(empty($id_people) && !empty($_SESSION['logged_in']['id_people'])){
		$id_people = $_SESSION['logged_in']['id_people'];
	}
	
	if(!empty($id_people)){
		$arr['id']				= saltit($id_people);
		$arr['expire']			= $expire;
		$arr['valid']			= 1;
		$r 						= setcookie($cookie_name, saltit(json_encode($arr)), $expire, "/", $domain);
		$_COOKIE[$cookie_name] 	= saltit(json_encode($arr));
		$arr['id_people']		= $id_people;
		return $arr;
	}
	
	return $r;
	 
 }
 
 function get_login_session_cookie($vars=null){
	$cookie_name 			= $this->get_login_cookie_name();
	$r = json_decode(unsalt($this->input->cookie($cookie_name,TRUE)), true);
	
	if(!empty($r['id'])){
		$r['id']			= unsalt($r['id']);
		$r['valid']			= null;
		
		if(empty($vars['bypass_session'])){
			$data['people']		= $this->people_model->get_person(array('id_people' => $r['id']));
			if($data['people']['people_state'] > 0	&& !empty($data['people']['password']) && $r['expire'] > time()){	
				$_SESSION['logged_in']	= array();
				$_SESSION['logged_in']	= $data['people'];
				$r['has_valid_cookie']	= true;
				$r['logged_in']			= true;
				$r['valid']				= 1;
				
				$_SESSION['logged_in']['access_levels']		= $this->security_model->get_user_access_levels();
			
			
				//Attach admin churches
				$id_churches			= $this->security_model->set_user_admin_churches(array('id_people' => $r['id']));
			}
		}
	}
	
	return $r;
	 
 }

 function delete_login_session_cookie(){
	$domain					= null;
	$cookie_name 			= $this->get_login_cookie_name();
	$expire					= time()-3600;

	if(!is_localhost()){
		$domain = '.promiseserves.org';
	}

	setcookie($cookie_name, saltit(json_encode(array('expire' => $expire))), $expire, "/", $domain );
	unset($_COOKIE[$cookie_name]);
	 
 }
 
 
 function get_login_cookie_name(){
	if(!empty($_SESSION['affiliate']['affiliate_subdomain'])){
		$cookie_name	= $_SESSION['affiliate']['affiliate_subdomain'].'_promiseserves_org-session';
	}else{
		$cookie_name	= 'promiseserves_org-session';
	}
	
	return $cookie_name;
 }
 

 
function set_user_admin_people($vars){ 
	$id_peoples 	= $this->get_user_admin_people($vars);
	
	$id_affiliate	= $this->affiliates_model->get_active_affiliate_id();
	$_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_people']	= $id_peoples;
	
	return $id_peoples;
}

function get_user_admin_people($vars=null){
	$id_peoples			= array();
	$id_affiliate		= $this->affiliates_model->get_active_affiliate_id();
	if(!empty($vars['id_affiliate'])){
		$id_affiliate = $vars['id_affiliate'];
	}
	
	
	$comms_allowed = $this->get_can_admin_communities();
	
		if(!empty($comms_allowed)){
			foreach($comms_allowed as $com){
				$assigns	= $this->website_model->get_assignments(array('assignment_type' => 'people_to_community', 'id_community' => $com, 'debug' => 0));
				foreach($assigns as $cur){
					if(!empty($cur['id_people'])){
						$id_peoples[] = $cur['id_people'];
					}
				}
			}
		}
	
	return array_unique($id_peoples);
}

 
function set_user_admin_churches($vars=null){ 
	$id_churches 	= $this->get_user_admin_churches($vars);

	$id_affiliate	= $this->affiliates_model->get_active_affiliate_id();
	
	$_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches']	= $id_churches;
	return $id_churches;
}


function get_user_admin_churches($vars=null){
	$id_churches		= array();
	$id_campuses		= array();
	$arr_id_roles		= array(550,705,706,707,708,710,720,730);
	
	
	
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	$assigns 			= $this->people_model->get_assignments($vars);
	
	if(!empty($assigns)){
		foreach($assigns as $cur){
			if(!empty($cur['id_role'])){
				if(in_array($cur['id_role'], $arr_id_roles) && !empty($cur['id_church'])){
					$id_churches[]		= $cur['id_church'];
				}
			}
		}
	}

	
	$id_churches = array_unique($id_churches);
	
	//Check for multicampus churches
	if(!empty($id_churches)){
		$churches = $this->churches_model->get_churches(array('id_churches' => $id_churches, 'debug' => 0));
		
		
		if(!empty($churches)){
			foreach($churches as $cur){
				//echo '<br />'.$cur['id_church'].' '.$cur['id_church_parent'];
				if($this->churches_model->is_multi_campus($cur['id_church'])){
					//$cur['id_church']	= $cur['id_church_parent'];
					$id_campuses		= $this->churches_model->get_all_campus_church_ids(array('id_church' => $cur['id_church'], 'include_parent' => 1));
					$id_churches		= array_merge($id_churches, $id_campuses);
				}
				
			}
		}
	}
	
	
	$id_churches = array_unique($id_churches);
	
	
	sort($id_churches);
	return $id_churches;
}

function get_user_participating_churches($vars){
	$id_churches		= array();
	$id_campuses		= array();
	$arr_role_scopes	= array('community_family', 'community_volunteer');
	$assigns 			= $this->people_model->get_assignments($vars);
	
	
	if(!empty($assigns)){
		foreach($assigns as $cur){
			if(!empty($cur['role_scope'])){
				if(in_array($cur['role_scope'], $arr_role_scopes) && !empty($cur['id_church'])){
					$id_churches[]		= $cur['id_church'];
				}
			}
		}
	}
	$id_churches = array_unique($id_churches);
	
	//Check for multicampus churches
	if(!empty($id_churches)){
		$churches = $this->churches_model->get_churches(array('id_churches' => $id_churches, 'debug' => 0));
		if(!empty($churches)){
			foreach($churches as $cur){
				if(empty($cur['is_campus'])){
					$id_campuses	= $this->churches_model->get_all_campus_church_ids(array('id_church' => $cur['id_church'], 'include_parent' => 1));
				}
				$id_churches	= array_merge($id_churches, $id_campuses);
			}
		}
	}
	$id_churches = array_unique($id_churches);
	sort($id_churches);
	return $id_churches;
}


function can_admin_family($vars){
	$vars 						= format_array_vals($vars, 'id_family');
	$id_affiliate				= $this->affiliates_model->get_active_affiliate_id();
	$arr_override_scopes		= array('community_build');
	
	
	if(!empty($vars['scope']) && in_array($vars['scope'], $arr_override_scopes)){
		
	}elseif($this->security_model->user_has_access(80)){
		return true;
	}
	

	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'])){
		$churches_allowed		= $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'];

		
		if(!empty($vars['id_church_home'])){
			if(in_array($vars['id_church_home'], $churches_allowed)){
				return true;
			}
		}
		
		if(!empty($vars['id_church_add'])){
			if(in_array($vars['id_church_add'], $churches_allowed)){
				return true;
			}
		}
		
		if(!empty($vars['id_church_claim'])){
			if(in_array($vars['id_church_claim'], $churches_allowed)){
				return true;
			}
		}
	}

	
	return false;
}

function can_admin_person($vars){
	$vars 						= format_array_vals($vars, 'id_people');
	$id_affiliate				= $this->affiliates_model->get_active_affiliate_id();
	$arr_override_scopes		= array('community_build');
	
	//User can admin themselves
	if(!empty($_SESSION['logged_in']['id_people']) && $vars['id_people'] == $_SESSION['logged_in']['id_people']){
		return true;
	}

	if(!empty($vars['scope']) && in_array($vars['scope'], $arr_override_scopes)){
		
	}elseif($this->security_model->user_has_access(80)){
		return true;
	}
	
	
	
	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'])){
		$churches_allowed		= $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'];
		
		if(!empty($vars['id_churches_assigned'])){
			if(!is_array($vars['id_churches_assigned'])){
				$vars['id_churches_assigned']	= explode(',',$vars['id_churches_assigned']);
			}
			if(!empty($vars['id_home_church'])){
				$vars['id_churches_assigned'][]	= $vars['id_home_church'];
			}
			
		}elseif(!empty($vars['id_home_church'])){
			$vars['id_churches_assigned'][]	= $vars['id_home_church'];
		}
		
		if(!empty($vars['id_churches_assigned'])){
			foreach($vars['id_churches_assigned'] as $cur){
				if(in_array($cur, $churches_allowed)){
					return true;
				}
			}
		}
		if(!empty($churches_allowed) && !empty($vars['id_church_add'])){
			if(in_array($vars['id_church_add'], $churches_allowed)){
				return true;
			}
		}
	}elseif(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_communities'])){
		if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_people'])){
			if(in_array($vars['id_people'], $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_people'])){
				return true;
			}
		}
		
		$comms_allowed		= $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_communities'];
		if(!empty($comms_allowes)){
			foreach(array_unique($comms_allowed) as $com){
				$assigns			= $this->website_model->get_assignments(array('assignment_type' => 'people_to_community', 'id_community' => $com));
				foreach($assigns as $cur){
					if(!empty($cur['id_people']) && $cur['id_people'] == $vars['id_people']){
						return true;
					}
				}
			}
		}
	}
	
	
	return false;
}

function can_admin_church_scope($vars=null){
	$id_affiliate	= $_SESSION['affiliate']['id_affiliate'];
	
	if($this->security_model->user_has_access(80)){
		return true;
	}
	//dds($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches']);

	
	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'])){
		$churches_allowed		= $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'];
		if(!empty($vars['id_church']) && in_array($vars['id_church'], $churches_allowed)){
			return true;
		}
			
	}
	
	return false;
}

function get_admin_church_id_array($vars=null){
	
	if(!empty($vars['id_affiliate'])){
		$id_affiliate	= $vars['id_affiliate'];
	}else{
		$id_affiliate	= $this->affiliates_model->get_active_affiliate_id();
	}

	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'])){
		return array_unique($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches']);
	}
	return array();
}

function get_volunteer_admin_scope($vars=null){
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	$id_churches		= array();
	$id_communities		= array();
	$id_families		= array();
	$id_campuses		= array();
	$arr_id_roles		= array(310);
	$id_affiliate		= $vars['id_affiliate'];
	
	$assigns 			= $this->people_model->get_assignments($vars);
	if(!empty($assigns)){
		foreach($assigns as $cur){
			if(!empty($cur['id_role'])){
				if(in_array($cur['id_role'], $arr_id_roles) && !empty($cur['id_community'])){
					$id_communities[]		= $cur['id_community'];
				}
			}
		}
	}

	//Get Families connect to communities
	foreach($id_communities as $cur){
		$id_families[]	= $this->communities_model->get_family_id_from_community_id(array('id_community' => $cur));
	}

	//Get Churches connected to communities
	foreach($id_communities as $cur){
		$id_churches[]	= $this->communities_model->get_serving_church_id_from_community_id(array('id_community' => $cur));
	}

	$id_churches 																= array_unique($id_churches);
	$id_communities																= array_unique($id_communities);
	$id_families																= array_unique($id_families);
	$_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches']	= $id_churches;
	$_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_communities']	= $id_communities;
	$_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_families']	= $id_families;

}

function get_active_access_level($vars=null){
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	$id_affiliate		= $vars['id_affiliate'];
		
	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['scopes']['global']['access_level'])){
		return $_SESSION['logged_in']['access_levels'][$id_affiliate]['scopes']['global']['access_level'];
	}
	
	
	return null;
}

function is_access_level_team_leader($vars=null){
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	$id_affiliate		= $vars['id_affiliate'];
	$access_level 		= $this->get_active_access_level($vars);
		
	if($access_level == 35){
		return true;
	}
		
	return false;
}

function is_access_level_advocate($vars=null){
	
	//Used to verify if a specific or current user has advocate access in their current affiliate scope (login parameters)
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}

	if(!empty($vars['highest_access_level'])){
		$access_level 		= $vars['highest_access_level'];
	}else{
		$access_level 		= $this->get_active_access_level($vars);
	}

	$arr_levels			= array(60,65,66,70);
		
	if(in_array($access_level, $arr_levels)){
		return true;
	}
		
	return false;
}

function is_access_level_church_staff($vars=null){
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}

	$access_level 		= $this->get_active_access_level($vars);
	$arr_levels			= array(70);
		
	if(in_array($access_level, $arr_levels)){
		return true;
	}
		
	return false;
}

function user_has_advocate_access($vars=null){
	//Used to verify if a specific user has advocate access at any affiliate
	$vars = format_array_vals($vars, 'id_people');
	
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	
	if(!empty($vars['id_people'])){
		$assigns 			= $this->website_model->get_assignments(array('id_people' => $vars['id_people'], 'assignment_type' => 'people_to_church'));
		//dds($assigns);
		if(!empty($assigns)){
			foreach($assigns as $cur){
				if($cur['id_role'] >= 700 && $cur['id_role'] <= 799 && $cur['state'] > 0){
					return true;
				}
			}
		}
	}
		
	return false;
}

function is_user_team_leader($vars=null){
    $vars['return_array']    = 1;
    $r                       = $this->user_only_role($vars);
    
    if(!empty($r['team_leader'])){
        return true;
    }
    
    return false;
    
}

function is_user_advocate($vars=null){
    $vars['return_array']    = 1;
    $r                       = $this->user_only_role($vars);
    
    if(!empty($r['advocate'])){
        return true;
    }
    
    return false;
    
}

function user_only_role($vars=null){
	//Used to verify if a specific user has advocate access at any affiliate
	$vars = format_array_vals($vars, 'id_people');
	
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	
	$is['volunteer']			= false;
	$is['prospect']				= false;
	$is['advocate']				= false;
	$is['staff']				= false;
	$is['church_staff']			= false;
	$is['team_leader']			= false;
	$is['family_member']		= false;
	
	if(!empty($vars['id_people'])){
		//$assigns 			= $this->website_model->get_assignments(array('id_people' => $vars['id_people'], 'assignment_type' => 'people_to_church'));
	    $assigns 			= $this->website_model->get_assignments(array('id_people' => $vars['id_people']));
		//dds($assigns);
		if(!empty($assigns)){
			foreach($assigns as $cur){
				if($cur['id_role'] >= 800 && $cur['id_role'] <= 999 && $cur['state'] > 0){
					$is['staff'] = 1;
				}
				if($cur['id_role'] >= 700 && $cur['id_role'] <= 799 && $cur['state'] > 0){
					$is['advocate'] = true;
				}
				if($cur['id_role'] >= 300 && $cur['id_role'] <= 399 && $cur['state'] > 0){
					$is['volunteer'] = true;
				}
				if($cur['id_role'] == 100 && $cur['state'] > 0){
					$is['volunteer'] = true;
				}
				if($cur['id_role'] == 310 && $cur['state'] > 0){
					$is['team_leader'] = true;
				}
				if($cur['id_role'] >= 1 && $cur['id_role'] <= 20 && $cur['state'] > 0){
					$is['family_member'] = true;
				}
			}
			
			if(!empty($vars['return_array'])){
			    return $is;
			}
			
			//Team Leader
			if($is['team_leader'] && !$is['advocate'] && !$is['staff'] && !$is['church_staff'] && !$is['family_member']){
				return 'team_leader';
			}
			
			//Volunteer
			if($is['volunteer'] && !$is['advocate'] && !$is['staff'] && !$is['church_staff'] && !$is['family_member']){
				return 'volunteer';
			}
			
			//Advocate
			if($is['advocate'] && !$is['volunteer'] && !$is['staff'] && !$is['church_staff'] && !$is['family_member']){
				return 'advocate';
			}
			
			//Advocate
			if($is['church_staff'] && !$is['volunteer'] && !$is['staff'] && !$is['advocate'] && !$is['family_member']){
				return 'advocate';
			}
			
			//Family Member
			if($is['family_member'] && !$is['advocate'] && !$is['staff'] && !$is['church_staff'] && !$is['family_member']){
				return 'family_member';
			}
			
			//Prospect
			if($is['prospect']){
				return 'prospect';
			}
			
			return 'mixed';
			
		}
	}
	
	return false;
		
	
}


function user_has_portal_access($vars=null){
		
	if($this->security_model->user_has_access(60) && empty($vars['id_people']) && !empty($_SESSION['logged_in']['has_portal_access'])){
		return true;

	}

	if($this->security_model->user_has_access(85)){
		return true;
	}	
		
	return false;
}

function get_can_admin_communities($vars=null){
	
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	
	$id_affiliate		= $vars['id_affiliate'];
	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_communities'])){
		//return $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_communities'];
	}
	
	//Last ditch check for Team Leaders
	$coms = $this->website_model->get_assignments(array('assignment_type' => 'people_to_community', 'id_role' => 310, 'id_people' => $vars['id_people']));
	if(!empty($coms)){
		foreach($coms as $cur){
			if(!empty($cur['id_community'])){
				$arr[]	= $cur['id_community'];
			}
		}
		
		$_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_communities']	= $arr;
		return array_unique($arr);
	}
	
	
	
	return array();

}

function get_can_admin_churches($vars=null){
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	
	$id_affiliate		= $vars['id_affiliate'];
	
	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'])){
		return $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_churches'];
	}
	
	return array();

}

function get_can_admin_families($vars=null){
	$arr = array();
	if(empty($vars['id_affiliate'])){
		$vars['id_affiliate']	= $this->affiliates_model->get_active_affiliate_id();
	}
	if(empty($vars['id_people']) && !empty($_SESSION['logged_in']['id_people'])){
		$vars['id_people']		= $_SESSION['logged_in']['id_people'];
	}
	
	$id_affiliate		= $vars['id_affiliate'];
	
	if(!empty($_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_families'])){
		return $_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_families'];
	}
	
	//Last ditch check for Team Leaders
	$coms = $this->website_model->get_assignments(array('assignment_type' => 'people_to_community', 'id_role' => 310, 'id_people' => $vars['id_people']));
	if(!empty($coms)){
		foreach($coms as $cur){
			$cur_id	= $this->communities_model->get_family_id_from_community_id($cur['id_community']);
			if(!empty($cur_id)){
				$arr[]	= $cur_id;
			}
		}
		
		$arr = array_unique($arr);
		
		$_SESSION['logged_in']['access_levels'][$id_affiliate]['admin_families']	= $arr;
		return $arr;
	}
	
	return array();

}

function make_gdpr_accost(){

$r = '<div id="ltp-gdpr-accost" style="bottom: 0px; background-color: rgb(17, 17, 17); z-index: 999999; opacity: 0.9; position: fixed; padding: 15px 0px 5px; width: 100%; left: 0px; font-size: 13px; font-weight: normal; text-align: left; letter-spacing: normal; color: rgb(255, 255, 255); font-family: Arial, sans-serif;">
		<div id="ltp_wrapper" style="width: 100%; margin: 0px auto; font-size: 13px; font-weight: normal; text-align: center; color: rgb(255, 255, 255); font-family: Arial, sans-serif; line-height: 18px; letter-spacing: normal; padding: 0px 5px;"><h4 id="ltp_header" style="background-color: rgb(17, 17, 17); z-index: 999999; padding: 0px 0px 7px; text-align: center; color: rgb(255, 255, 255); font-family: Arial, sans-serif; display: block; font-size: 18px; font-weight: bold; margin: 0px;">This website uses cookies</h4>This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.<br>
			<div class="col-xs-12 col-sm-4 col-sm-offset-4">
				<div class="row top20">
					<div class="col-sm-6 col-xs-12">
						<button class="btn btn-primary" id="ltp-gdpr-accept">I agree</button>
					</div>
					<div class="col-sm-6 col-xs-12">
						<a class="btn btn-default" href="'.base_url().'privacy-policy#cookie-useage">Read more</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
	
	</script>';
	
	return $r;
}//end make_gdpr_accost function


function save_login_log($data){
	$vars		= $data;
	
	if(empty($data['id_login_log']) && !empty($_SESSION['login']['id_login_log'])){
		$data['id_login_log']	= $_SESSION['login']['id_login_log'];
	}
	
	if(!empty($data['id_login_log']) || !empty($data['email']) || !empty($data['email_people_primary']) || !empty($data['id_people']) || !empty($data['id_people_encoded'])){
			
		if(empty($data['state'])){
			$data['state']	= 1;
		}
		
		if(empty($data['id_people']) && !empty($data['id_people_encoded'])){
			$data['id_people']	= url_dec($data['id_people_encoded']);
		}
		
		if(empty($data['ip_address'])){
			$data['ip_address'] = $_SERVER['REMOTE_ADDR'];
		}
		
		if(empty($data['id_'])){
			$data['ip_address'] = $_SERVER['REMOTE_ADDR'];
		}
		
		if(empty($data['user_agent'])){
			$data['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
		}
		
		if(empty($data['id_affiliate']) && !empty($_SESSION['affiliate']['id_affiliate'])){
			$data['id_affiliate'] = $_SESSION['affiliate']['id_affiliate'];
		}
		
		if(empty($data['login_msg'])){
			$data['login_msg'] = 'Attempted';
		}
		
		if(!empty($data['login_log']) && !empty($_SESSION['login']['login_log'])){
			$data['login_log'] = $_SESSION['login']['login_log']."\r\n".date('Y-m-d H:i:s').': '.$data['login_log'];
		}elseif(empty($data['login_log']) && empty($_SESSION['login']['login_log'])){
			$data['login_log'] = date('Y-m-d H:i:s').': Attempted login';
		}elseif(!empty($data['login_log'])){
			$data['login_log'] = date('Y-m-d H:i:s').': '.$data['login_log'];
		}
		
		if(isset($data)){
			$schema 		= $this->db->list_fields('ltp_login_log');
			foreach($data AS $key => $val){
				if(!in_array($key,$schema)){
					unset($data[$key]);
				}
			}
		}
		
		$data['date_mod'] 				= time();

		//Check to update table first
		if(!empty($data['id_login_log'])){
			$this->db->where('id_login_log', $data['id_login_log']);
			if($this->db->update('ltp_login_log', $data)){
				$result['db_update'] 								= TRUE;
				$result['status'] 									= TRUE;
				$result['id_login_log']								= $data['id_login_log'];
				$result['result']									= 'success';
				$result['method']									= 'update';
				$result['data']										= $data;
			}
		}else{
			$data['date_add'] 										= time();
			if ($this->db->insert('ltp_login_log', $data)){
				$result['db_update'] 								= TRUE;
				$result['status'] 									= TRUE;
				$result['id_login_log']								= $this->db->insert_id();
				$result['result']									= 'success';
				$result['method']									= 'insert';
				$result['data']										= $data;
				$_SESSION['login']									= array('id_login_log' => $result['id_login_log'], 'login_log' => $data['login_log']);
			}
		}
		
		if(!empty($vars['terminate_log'])){
			unset($_SESSION['login']);
		}
		
		return $result;
	}
}

function get_users_web_browser(){
	$arr_browsers 	= ["Opera", "Edge", "Chrome", "Safari", "Firefox", "MSIE", "Trident"];
	$agent 				= $_SERVER['HTTP_USER_AGENT'];
	$user_browser 	= '';
	
	foreach ($arr_browsers as $browser) {
		if (strpos($agent, $browser) !== false) {
			$user_browser = $browser;
			break;
		}   
	}
  
	switch ($user_browser) {
		case 'MSIE':
			$user_browser = 'Internet Explorer';
			break;
	  
		case 'Trident':
			$user_browser = 'Internet Explorer';
			break;
	  
		case 'Edge':
			$user_browser = 'Microsoft Edge';
			break;
	}
  
	return $user_browser;
}
	
function clear_user_session_data(){
		
		unset($_SESSION['user']);
		unset($_SESSION['cache']);
		unset($_SESSION['affiliate']);
		unset($_SESSION['logged_in']);
		unset($_SESSION['last_viewed']);
		unset($_SESSION['view_limiter']);
		unset($_SESSION['id_people']);
		unset($_SESSION['user_timezone_offset']);
		unset($_SESSION['event']);
		unset($_SESSION['home_popup_accost']);
		unset($_SESSION['churches_associated']);
		unset($_SESSION['needs_types_associated']);
		unset($_SESSION['bypass_login']);
		unset($_SESSION['data']);
		unset($_SESSION['last_viewed']);
		unset($_SESSION['login']);
		unset($_SESSION['needs_types_associated']);
		unset($_SESSION['calendar']);
		$this->security_model->delete_login_session_cookie();
		$this->affiliates_model->set_affiliate_data_session();
		return true;
}

function make_people_edit_key($vars=null){
	$return_array	= false;
	if(isset($vars) && !is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars = array('id_people' => $new);
	}
		
	if(!empty($vars['id_people'])){
		$vars['scope']				= 'people';
		return $this->make_edit_key($vars);
	}
	
	return null;
}

function delete_people_edit_key($vars=null){
	$return_array	= false;
	if(isset($vars) && !is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars = array('id_people' => $new);
	}
		
	if(!empty($vars['id_people'])){
		$vars['scope']				= 'people';
		$vars['delete_key']			= 1;
		return $this->make_edit_key($vars);
	}
	
	return null;
}

function make_family_edit_key($vars=null){
	$return_array	= false;
	if(isset($vars) && !is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars = array('id_family' => $new);
	}
		
	if(!empty($vars['id_family'])){
		$vars['scope']				= 'family';
		return $this->make_edit_key($vars);
	}
	
	return null;
}

function delete_family_edit_key($vars=null){
	$return_array	= false;
	if(isset($vars) && !is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars = array('id_family' => $new);
	}
		
	if(!empty($vars['id_family'])){
		$vars['scope']				= 'family';
		$vars['delete_key']			= 1;
		return $this->make_edit_key($vars);
	}
	
	return null;
}

function make_church_edit_key($vars=null){
	$return_array	= false;
	if(isset($vars) && !is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars = array('id_church' => $new);
	}
		
	if(!empty($vars['id_church'])){
		$vars['scope']				= 'church';
		return $this->make_edit_key($vars);
	}
	
	return null;
}

function delete_church_edit_key($vars=null){
	$return_array	= false;
	if(isset($vars) && !is_array($vars)){
		$new = $vars;
		unset($vars);
		$vars = array('id_church' => $new);
	}
		
	if(!empty($vars['id_church'])){
		$vars['scope']				= 'church';
		$vars['delete_key']			= 1;
		return $this->make_edit_key($vars);
	}
	
	return null;
}

function make_edit_key($vars=null){
	
	//Correct missing scope arguments
	if(empty($vars['scope'])){
		if(!empty($vars['id_family'])){
			$vars['scope'] = 'family';
		}elseif(!empty($vars['id_family_encoded'])){
			$vars['scope'] 		= 'family';
			$vars['id_family']	= $vars['id_family_encoded'];
		}elseif(!empty($vars['id_people'])){
			$vars['scope'] = 'people';
		}elseif(!empty($vars['id_people_encoded'])){
			$vars['scope'] 		= 'people';
			$vars['id_people']	= $vars['id_people_encoded'];
		}elseif(!empty($vars['id_church'])){
			$vars['scope'] = 'church';
		}elseif(!empty($vars['id_church_encoded'])){
			$vars['scope'] 		= 'church';
			$vars['id_church']	= $vars['id_church_encoded'];
		}
	}
	
	$scope = strtolower($vars['scope']);
	
	if(!empty($scope)){
		$scope_plural = $this->website_model->get_scope_plural($scope);
		
		//Preserve the edit key if it already exists.
		if(!empty($vars['preserve_key'])){
			$sql 	= "SELECT * FROM ltp_".$scope_plural." WHERE `id_".$scope."` = ".$this->db->escape($vars['id_'.$scope]);
			$query 	= $this->db->query($sql,false);
			
			if($query -> num_rows() > 0){
				$r = $query->result_array();
				
				if(!empty($r[0]['edit_key'])){
					if(empty($r[0]['edit_key_date_expire']) || (!empty($r[0]['edit_key_date_expire']) && $r[0]['edit_key_date_expire'] > (time() + 3600))){ 
						return $r[0]['edit_key'];
					}
				}
			}
		}
		
		if(!empty($vars['id_'.$scope])){
			$vars['edit_key'] 		= $scope.'_'.md5(saltit('L!veThePr0m!s3'.$scope.$vars['id_'.$scope].microtime()));
		
			if(!empty($vars['expiration'])){
				if($vars['expiration'] < 2){
					$vars['edit_key_date_expire']	= time()+ (86400 *30);	
				}else{
					$vars['edit_key_date_expire']	= $vars['expiration'];
				}
			}
			
			if(!empty($vars['delete_key'])){
				$vars['edit_key'] 				= NULL;
				$vars['edit_key_date_expire']	= NULL;
				$vars['return_array']			= 1;
			}
			
			if(isset($vars)){
				$schema 		= $this->db->list_fields('ltp_'.$scope_plural);
				foreach($vars AS $key => $val){
					if(!in_array($key,$schema)){
						unset($vars[$key]);
					}
				}
			}
			
			$this->db->where('id_'.$scope, $vars['id_'.$scope]);
			
			if($this->db->update('ltp_'.$scope_plural, $vars)){
				$result['db_update'] 				= TRUE;
				$result['status'] 					= TRUE;
				$result['id_'.$scope]				= $vars['id_'.$scope];
				$result['result']					= 'success';
				$result['method']					= 'update';
				$result['data']						= $vars;
			}
		
			if(!empty($vars['return_array'])){
				return $result;
			}
			
			return $vars['edit_key'];
		}	
	}
	
	return null;
}

function get_logged_in_user_info($vars=null){
	if(!empty($_SESSION['logged_in'])){
		return $_SESSION['logged_in'];
	}
	if(!empty($vars['use_guest']) && !empty($_SESSION['user'])){
		return $_SESSION['user'];
	}
	
	return array('id_people' => 1);
}


function secure_frontend_edit_resource($vars=null){
	if(!empty($vars) && !is_array($vars)){
		$new								= $vars;
		unset($vars);
		$vars['access_level']				= $new;
	}
	
	
	if(empty($vars['access_level'])){
		$vars['access_level'] = 0;
	}
	
	/*
	if(!empty($vars['id_people'])){
		$user	= array('id_people' => $vars['id_people']);
	}
	*/
	
	$user = $this->get_logged_in_user_info();
	
	if(!empty($user['id_people']) && $user['id_people'] > 1){

		return $this->secure_resource($vars['access_level']);
	}
	
	$ekey = get_req('ekey');
	
	if(!empty($ekey)){
		$arr 	= explode('_', $ekey);
		$scope 	= strtolower($arr[0]);
		
		if(!empty($scope)){
			$scope_plural = $this->website_model->get_scope_plural($scope);
			$sql 	= "SELECT * FROM ltp_".$scope_plural." WHERE `edit_key` = ".$this->db->escape($ekey)." AND `id_".$scope."` = ".$this->db->escape($vars['id_'.$scope]);
			$query 	= $this->db->query($sql,false);
			
			if($query -> num_rows() > 0){
				$r = $query->result_array();

				if(!empty($r[0]['edit_key_date_expire']) && $r[0]['edit_key_date_expire'] <= time()){
					redirect(base_url().$scope_plural.'/error?error_code=expired_ekey&src='.$_SERVER['REQUEST_URI']);		
				}
				return true;
			}
			
			redirect(base_url().$scope_plural.'/error?error_code=nomatch_ekey&src='.$_SERVER['REQUEST_URI']);
		}
		
	}
	redirect(base_url().$scope_plural.'/error?error_code=no_ekey&src='.$_SERVER['REQUEST_URI']);
}
	
	
function can_admin_event($vars=null){
	$user 			= $this->website_model->get_user_session();
	
	if(empty($vars['event_name']) && !empty($vars['id_event'])){
		$events		= $this->events_model->get_event(array('id_event' => $vars['id_event']));
		$vars		= array_merge($vars,$events);
		
	}
	
	
	if(!empty($vars['id_event_contact']) && $user['id_people'] == $vars['id_event_contact']){
		return true;
	}
	if(!empty($vars['id_add']) && $user['id_people'] == $vars['id_add']){
		return true;
	}
	
	if($this->can_admin_church_scope($vars)){
		return true;
	}
	
	if(!empty($vars['assign_community_id_church'])){
		$vars['id_church']	= $vars['assign_community_id_church'];
	}	
	if($this->can_admin_church_scope($vars)){
		return true;
	}
	
	
	if($this->get_scope_limit_role() == 'communities' && !empty($vars['assign_id_community']) && $this->user_has_access(35)){
		$arr_role_ids	= $this->get_scope_limit_role_ids();
		if(!empty($arr_role_ids)){
			if(in_array($vars['assign_id_community'], $arr_role_ids)){
				return true;
			}
		}
	}
	
	
	return false;
	
}


function can_claim_event($vars=null){
	return $this->can_confirm_event($vars);
}

function can_confirm_event($vars=nll){

	$user 			= $this->website_model->get_user_session();
	
	if(empty($vars['event_name']) && !empty($vars['id_event'])){
		$events		= $this->events_model->get_event(array('id_event' => $vars['id_event']));
		$vars		= array_merge($vars,$events);
		
	}
	
	if($this->events_model->event_is_meal($vars)){
		//Check first for meal events that have pre-assigned meals
		$assign = $this->website_model->get_assignment(array('id_event' => $vars['id_event'], 'id_people' => $user['id_people'], 'assignment_type' => 'people_to_event', 'id_role' => 81));
		if(!empty($assign)){
			return true;
		}else{
			//If no one is assigned to meal then make it open to be claimed by anyone on the team
			$assigns = $this->website_model->get_assignments(array('id_event' => $vars['id_event'], 'assignment_type' => 'people_to_event', 'id_role' => 81));	
			if(empty($assigns)){
				return true;
			}
		}
	}
	
	if($this->events_model->event_is_need($vars)){
	//	$assign = $this->website_model->get_assignment(array('id_event' => $events['id_event'], 'id_people' => $user['id_people'], 'assignment_type' => 'people_to_event', 'id_role' => 81));
		//if(!empty($assign)){
			return true;
		//}
	}
	
	
	
	return false;
	
}

function can_login($vars){
	$vars = format_array_vals($vars, 'id_people');
	
	if(!empty($vars['id_people'])){
		if(!isset($vars['password'])){
			$vars = $this->people_model->get_person($vars);
		}
		if(!empty($vars['password'])){
			return true;
		}
	}
	
	return false;
	
}

function get_roles($vars){
	
	 $sql = "SELECT * FROM `ltp_roles` AS r WHERE 1=1";
	
	if(!empty($vars['id_role'])){
		$sql .= " AND r.`id_role` =  ".$this->db->escape($vars['id_role']);
	}else{
		if(!empty($vars['id_roles'])){
			if(is_array($vars['id_roles'])){
				$vars['id_roles']	= explode(',',$vars['id_roles']);
			}
			$sql .= " AND r.id_role IN (".$vars['id_roles'].")";
		}
		if(!empty($vars['role_name'])){
			$sql .= " AND r.role_name =  ".$this->db->escape($vars['role_name']);
		}
		if(!empty($vars['role_scope'])){
			$sql .= " AND r.role_scope =  ".$this->db->escape($vars['role_scope']);
		}
		if(!empty($vars['role_permissions'])){
			$sql .= " AND r.role_permissions =  ".$this->db->escape($vars['role_permissions']);
		}
		if(!empty($vars['is_serving_role'])){
			$sql .= " AND r.is_serving_role =  ".$this->db->escape($vars['is_serving_role']);
		}
		if(!empty($vars['role_scope_segment'])){
			$sql .= " AND r.role_scope_segment =  ".$this->db->escape($vars['role_scope_segment']);
		}
		
		if(!empty($vars['show_all'])){
			
		}elseif(isset($vars['state'])){
			$sql .= "  AND r.state = ".$this->db->escape($vars['state']);
		}else{
			$sql .= " AND r.state > 0 ";
		}
	}

	if(isset($vars['limit'])){
		$sql .= " LIMIT ".$vars['limit'];
	}else{
		$sql .= " LIMIT 500";
	}

	if(!empty($vars['debug'])){
		echo '<br /><br /><strong>$security_model->get_roles:</strong> '.$sql;
	}
	if(!empty($vars['debug_stop'])){
		echo '<br /><br /><strong>$security_model->get_roles:</strong> '.$sql;
		exit();
	}

	$query = $this->db->query($sql,false);

	if($query -> num_rows() > 0){
		return  $query->result_array();
	}elseif(!empty($vars['return_schema'])){
		return $empty;
	}else{
		return null;
	}
}

function get_role($vars){
	$r = $this->get_roles($vars);
	
	if(!empty($r[0])){
		return $r[0];
	}
	
	return array();
}

function secure_cron_task(){
		$key = get_req('key');
		if(!isset($_SERVER['REMOTE_ADDR'])){
			return true;
		}
		
		if(!empty($key) &&  strtolower($key) == 'promiseadminoverride'){
		  return  true;
		}elseif(empty($_SESSION['logged_in']) && !empty($got['key']) &&  strtolower($got['key']) != 'promiseadminoverride'){
			die('no valid key!');
		}else{
			return $this->website_model->require_login();
		}
		
		die();
}

function is_user_logged_in(){
	$user	= $this->website_model->get_user_session();
	if(!empty($user['id_people']) && $user['id_people'] > 1){
		return true;
	}
	return false;
}

function set_user_session($key, $val){
	$sess		= array();
	if(!empty($_SESSION['logged_in'])){
		$sess 	= $_SESSION['logged_in'];
	}
	
	if(!empty($key) && isset($val)){
		$sess[$key] 			= $val;
		$_SESSION['logged_in']	= $sess;
	}
	
	return $sess;
	
}

function is_in_affiliate_scope($vars){
	$vars['id_affiliate']	= !empty($vars['id_affiliate']) ? $vars['id_affiliate'] : $this->affiliates_model->get_active_affiliate_id();
	
	switch(strtolower($vars['role_scope'])){
		case 'church':
			if(!empty($vars['id_church'])){
				$arr_assign_types	= array('church_to_affiliate', 'people_to_church');
				$assigns 			= $this->website_model->get_assignments(array('id_church' => $vars['id_church'], 'id_affiliate' => $vars['id_affiliate']));
				
				if(!empty($assigns)){
					foreach($assigns as $cur){
						if(in_array(strtolower($cur['assignment_type']), $arr_assign_types)){
							return true;
						}
					}
				}
				
			}
		break;
	}
	
	return false;
}

function make_edit_block_message($vars){
	
		
	switch($vars['role_scope']){
		case 'church':
		case 'churches':
			$vars['id_given_church']	= !empty($vars['id_given_church']) ? $vars['id_given_church'] : null;
			$vars['id_church']			= !empty($vars['id_church']) ? $vars['id_church'] : $vars['id_given_church'];
			$vars['state']				= isset($vars['state']) ? $vars['state'] : 0;
			$vars['state']				= isset($vars['church_state']) ? $vars['church_state'] : $vars['state'];
			
			if(!$this->security_model->user_has_access(80)){
			
				switch($vars['state']){
					case -1:
					case -2:
					case -4:
					  return  '<p class="text-center">This church record is marked as deleted and cannot be edited. Please contact your regional manager or affiliate contact if you feel that this is in error.</p>';
					break;
					case 1:
						return '<p class="text-center">This church record is marked as inactive and cannot be edited. Please contact your regional manager or affiliate contact if you feel that this is in error.</p>';
					break;
					default:
						//Check for Can Admin
						$can_admin = $this->get_can_admin_churches();
						if(!in_array($vars['id_church'], $can_admin)){
							return '<p class="text-center">Sorry, but it appears that you do not have access to edit this church. Please contact your regional manager or affiliate contact if you feel that this is in error.</p>';
						}
					
						if($vars['state'] < 2){
							return '<p class="text-center">This church record is marked as inactive or you do not have access to edit it. Please contact your regional manager or affiliate contact if you feel that this is in error.</p>';
						}
					break;
				}
				
				
			}
			if(!$this->security_model->user_has_access(98)){
				if(!$this->security_model->is_in_affiliate_scope(array('role_scope' => 'church', 'id_church' => $vars['id_church']))){
					return '<p class="text-center">This church record belongs to another affiliate and cannot be edited. Please contact <a href="mailto:support@promiseserves.org">support@promiseserves.org</a> if you feel that this is in error.</p>';
				}
			}
		break;
		case 'family':
		
		
		break;
		
	}
	

	
	return null;

}

function save_affiliate_auth_key($vars){
	$vars					= format_array_vals($vars, 'id_people');
	$vars['affiliate_auth']	= !empty($vars['affiliate_auth']) ? $vars['affiliate_auth'] : $this->make_affiliate_auth_key($vars);
	
	if(!empty($vars['id_people']) && !empty($vars['affiliate_auth'])){
		$sql 					= "UPDATE ltp_people SET `affiliate_auth` = ".$this->db->escape($vars['affiliate_auth'])." WHERE id_people = ".$this->db->escape($vars['id_people']);
		$query 					= $this->db->query($sql,false);
		if(!empty($query)){
			$result['db_update'] 		= TRUE;
			$result['status'] 			= TRUE;
			$result['affiliate_auth']	= $vars['affiliate_auth'];
			$result['result']			= 'success';
			$result['method']			= 'update';
			$result['data']				= $vars;
			
			return $result;
		}
	}
	
	$result['db_update'] 		= FALSE;
	$result['status'] 			= FALSE;
	$result['affiliate_auth']	= $vars['affiliate_auth'];
	$result['result']			= 'failed';
	$result['method']			= 'update';
	$result['data']				= $vars;
	
	return $result;
}

function delete_affiliate_auth_key($vars){
	$vars					= format_array_vals($vars, 'id_people');
	
	if(!empty($vars['id_people'])){
		$sql 					= "UPDATE ltp_people SET `affiliate_auth` = '' WHERE id_people = ".$this->db->escape($vars['id_people']);
		$query 					= $this->db->query($sql,false);
		if(!empty($query)){
			$result['db_update'] 		= TRUE;
			$result['status'] 			= TRUE;
			$result['affiliate_auth']	= null;
			$result['result']			= 'success';
			$result['method']			= 'update';
			$result['data']				= $vars;
			
			return $result;
		}
	}
	
	$result['db_update'] 		= FALSE;
	$result['status'] 			= FALSE;
	$result['affiliate_auth']	= null;
	$result['result']			= 'failed';
	$result['method']			= 'update';
	$result['data']				= $vars;
	
	return $result;
}

function make_affiliate_auth_key($vars){
	$vars					= format_array_vals($vars, 'id_people');
	$user					= $this->website_model->get_user_session();
	
	$vars['id_people']		= !empty($vars['id_people']) ? $vars['id_people'] : $user['id_people'];
	$vars['email']			= !empty($vars['email']) ? $vars['email'] : $user['people_email_primary'];
	$vars['id_affiliate']	= !empty($vars['id_affiliate']) ? $vars['id_affiliate'] : $this->affiliates_model->get_active_affiliate_id();
	
	/*force email only for now*/
	$vars['id_people'] = 0;
	
	if($vars['id_people'] > 1){
		//Don't allow System ID to be used to create key
		return md5(saltit($vars['id_affiliate'].'#*&@(*U!jAS'.date('Ymdhm').'BNJUYDmnqaaiuYT'.$vars['id_people']));
	}elseif(!empty($vars['email'])){ 
		return md5(saltit($vars['id_affiliate'].'#*&@(*U!jAS'.date('Ymdhm').'BNJUYDmnqaaiuYT'.hash_challenge($vars['email'])));
	}
}

function get_persons_default_affiliate($vars){
	$vars 				= format_array_vals($vars, 'id_people');
	$r 					= null;
	$arr_other_roles 	= array(1,2,3,4,5,6,7,8,9,10,11,16,17,18,19,20,30,100,101,105,106,120,220,250,260);
	
	if(!empty($vars['id_people'])){
		$assigns = $this->website_model->get_assignments(array('id_people' => $vars['id_people'], 'id_role_gte' => 300));
		$id_role = 0;
		if(!empty($assigns)){
			foreach($assigns as $cur){
				if($id_role < $cur['id_role']){
					$r = $cur['id_affiliate'];
				}
			}
		}
		
		//If no volunteer roles are found then look for a family or prospect role
		if(empty($r)){
			$assigns = $this->website_model->get_assignments(array('id_people' => $vars['id_people'], 'id_roles' => $arr_other_roles));
			$id_role = 0;
			
			if(!empty($assigns)){
				foreach($assigns as $cur){
					if($id_role < $cur['id_role']){
						$r = $cur['id_affiliate'];
					}
				}
			}
		}
	}
	
	
	return $r;
}

function role_can_login($vars){
	$vars = format_array_vals($vars, 'id_role');
	if(!empty($vars['id_role'])){
		if($vars['id_role'] > 300){
			return true;
		}
		$arr_other_roles = array(1,2,3,4,5,6,7,8,9,10,11,16,17,18,19,20,100,101,105,106);
		if(in_array($vars['id_role'], $arr_other_roles)){
			return true;
		}
	}
	
	
	return false;
	
}


function is_post_human(){
	$posted				= $this->input->post();
	$has_honey_pot		= false;
	$has_honey_pot_val	= false;
	$has_fast_entry		= false;
	
	foreach($posted as $key => $val){
		if(stripos($key, 'hp_p686_') !== false){
			$has_honey_pot = true;
			if(!empty($val)){
				$has_honey_pot_val = true;
			}
		}
		if($key == 't'){
			if(!submitted_by_human($val)){
				$has_fast_entry = true;
			}
		}
	}
	
	dds($posted);
	
	if($has_fast_entry && $has_honey_pot_val){
		return false;
	}
	if($has_honey_pot_val){
		return false;
	}
	return true;
}

 
} //End Class
?>