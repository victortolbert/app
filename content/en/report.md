<?php
Class Reports_model extends CI_Model
{
 
 function get_report_parameters($vars=null){
		$got			= $this->input->get();
		$posted			= $this->input->post();
		$i					= 0;
	
		if(!empty($vars['debug'])){
			dds($vars, 'Debugged');
		}
		
		if(!empty($vars)){
			$data		= $vars;	
		}elseif(!empty($got)){
			$data		= $got;
		}elseif(!empty($posted)){
			$data		= $posted;
		}else{
			die('No parameters sent');
		}
		


		
		if(empty($data['output'])){
			$data['output'] 	= 'html';
		}
		
		if(!empty($data['id_affiliate'])){
			$data['params']['id_affiliate']		= $data['id_affiliate'];
		}else{
			$data['params']['id_affiliate']		= $_SESSION['affiliate']['id_affiliate'];
		}
		
		if(!empty($data['qtr'])){
			$data['range']	= 'qtr';
		}
		
		if(!empty($data['range'])){
			switch($data['range']){
				case 'lastyear':
				case 'last365days':
				case '365':
					$data['params']['date_add_end'] 		= time();
					$data['params']['date_add_start'] 		= time() - (86400 * 365);
				break;	
				case 'last180':
				case 'last180days':
				case '180':
					$data['params']['date_add_end'] 		= time();
					$data['params']['date_add_start'] 		= time() - (86400 * 180);
				break;
				case 'last90':
				case 'last90days':
				case '90':
					$data['params']['date_add_end'] 		= time();
					$data['params']['date_add_start'] 		= time() - (86400 * 90);
				break;
				case 'last60':
				case 'last60days':
				case '60':
					$data['params']['date_add_end'] 		= time();
					$data['params']['date_add_start'] 		= time() - (86400 * 10);
				break;
				case 'qtr':
					$data_tmp								= $data;
					$data_tmp['bypass_session']				= 1;
					$date_params							= $this->get_date_range_params($data_tmp);
					$data['params']							= array_merge($data['params'],$date_params); 
				break;
				
				default:
					
					$data['params']['date_add_end'] 		= time();
					$data['params']['date_add_start'] 		= time() - (86400 * 30);
				break;
			}
			$data['title']								= 'Report '.date('m/d/Y',$data['params']['date_add_start']).' - '.date('m/d/Y',$data['params']['date_add_end']);
		}else{
			$data['title']								= 'Report ';
		}
		
		
		//Check for affiliate IDS
		if(!empty($data['affiliate_address_states'])){
			$data['id_affiliates']	= array();
			$affiliates	=  $this->affiliates_model->get_affiliates(array('affiliate_address_states' => $data['affiliate_address_states']));
			if(!empty($affiliates)){
				foreach($affiliates as $affiliate){
					$data['id_affiliates'][] = $affiliate['id_affiliate'];
				}
				$data['id_affiliates'] = array_unique($data['id_affiliates']);
			}
			
		}
		if(!empty($data['affiliate_address_countries'])){
			$data['id_affiliates']	= array();
			$affiliates	=  $this->affiliates_model->get_affiliates(array('affiliate_address_country' => $data['affiliate_address_countries'], 'debug'=> 1));
			if(!empty($affiliates)){
				foreach($affiliates as $affiliate){
					$data['id_affiliates'][] = $affiliate['id_affiliate'];
				}
				$data['id_affiliates'] = array_unique($data['id_affiliates']);
			}
			
			
		}
		
		$_SESSION['report_params']	= $data['params'];
		
		
		return $data;
 }
 
 function cleanData(&$str){
		if($str == 't') $str = 'TRUE';
		if($str == 'f') $str = 'FALSE';
		if(preg_match("/^0/", $str) || preg_match("/^\+?\d{8,}$/", $str) || preg_match("/^\d{4}.\d{1,2}.\d{1,2}/", $str)) {
		  $str = "'$str";
		}
		if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"';
	}
	
	
	
	function format_field($key, $val){
		
		if(stripos($key, 'amount') !== false){
			$key = 'amount';
		}
		
		if(stripos($key, 'date') !== false){
			$key = 'date';
		}
		
		switch($key){
			case 'date_add':
			case 'date_add':
			case 'date':
				$val 	= date_offset('Y-m-d g:i:s A', $val);
			break;
			case 'amount':
				$val 	= '$'.$this->website_model->dollar_format($val);
			break;
			case 'church_state':
				$val 	= $this->churches_model->get_church_status_from_state(array('church_state' => $val));
			break;
			
		}
		
		return $val;
	}

	function output_csv($data){
		$arr_header_keys	= array();
		$arr_shown			= array();
		$id_grouper			= null;

		if(!empty($data['group_by'])){
			$id_grouper		= $data['group_by'];
		}
		
		if(!empty($data['filename'])){
				$filename	= $data['filename'];
		}else{
				$filename = str_replace(' ', '_',$_SESSION['affiliate']['affiliate_name'])."_" . date('Ymd') . ".csv";
		}
		
		if(empty($data['bypass_header_sort'])){
			if(!empty($data['headers']) && !empty($data['rows'])){
				foreach($data['headers'] AS $header_key => $name){
					$arr_header_keys[] = $header_key;
				}
				//Sort out data not defined by headers and re-sort value data to match
				foreach($data['rows'] as $data_key => $data_val){
					$can_show 	= false;
					$can_track	= false;
					
					if(empty($id_grouper)){
						$can_show = true;
					}elseif(!empty($id_grouper) && !in_array($data_val[$id_grouper], $arr_shown)){
						$can_show = true;
						$can_track = true;
					}
					
					if($can_show){
						if($can_track){
							$arr_shown[]			= $data_val[$id_grouper];
						}
						foreach($data['headers'] AS $header_key => $name){
							foreach($data_val as $cur_val_key => $cur_val_val){
								if($header_key == $cur_val_key){
									$clean_rows[$data_key][$cur_val_key]	= $this->format_field($cur_val_key, $data['rows'][$data_key][$cur_val_key]);
								}
							}
						}
					}
				}
			}
						
			if(!empty($clean_rows)){
				$data['rows']	= $clean_rows;
			}
		}

		header("Content-Disposition: attachment; filename=\"$filename\"");
		header("Content-Type: text/csv");

		$out 	= fopen("php://output", 'w');

		$flag 	= false;
		
		
		
		
		
		if(!empty($data['headers'])){
			array_walk($data['headers'], 'Reports_model::cleanData');
			fputcsv($out, array_values($data['headers']), ',', '"');
		}
		
		foreach($data['rows'] as $row){
		
			array_walk($row, 'Reports_model::cleanData');
			fputcsv($out, array_values($row), ',', '"');
		}
		
		

		fclose($out);
		exit;
	}
	
	function get_last_quarter_title($vars=null){
		$q = ceil(date('m') / 3);

		$q = $q - 1;
		if($q == 0){
			return 'Q4 '.(date('Y') -1);
		}else{
			return 'Q'.$q.' '.date('Y');
		}
	}
	
	function get_current_quarter_title($vars=null){
		$q = ceil(date('m') / 3);

		if($q == 0){
			return 'Q4 '.(date('Y') -1);
		}else{
			return 'Q'.$q.' '.date('Y');
		}
	}

	function get_current_quarter_code($vars=null){
		$q 		= ceil(date('m') / 3);
		$year	= date('Y');
		
		if($q == 0){
			return ($year -1).$q;
		}else{
			return $year.$q;
		}
	}
	
	function get_quarter_code_from_date($date){
		if(empty($date)){
			return null;
		}
		
		if(!is_numeric($date)){
			$date		= strtotime($date);
		}
		$q 				= ceil(date('m', $date) / 3);
		$year			= date('Y', $date);
		
		if($q == 0){
			return ($year -1).$q;
		}else{
			return $year.$q;
		}
	}
	
	function get_current_quarter_from_year_half($vars=null){
	    
	    $year	= date('Y');
	    
	    if(date('m') < 7){
	        return $year.'1';
	    }else{
	        return $year.'3';
	    }
	}
	
	function get_date_range_params($vars){
		$got			= $this->input->get();
		$posted			= $this->input->post();
		
		
		
		
		
		if(empty($vars['bypass_session']) && !empty($_SESSION['report_params'])){
			$debug = '';
			if(!empty($vars['debug'])){
				$debug				= 1;
			}
			$vars					= $_SESSION['report_params'];
			$vars['using_session']	= 1;
			$vars['debug']			= $debug;
		}
		
		if(!empty($vars['using_session']) && !empty($vars['qtr_name'])){
			return $vars;
		}
		
		
		if(empty($vars['range']) && empty($vars['qtr'])){
			 $vars['range']		= 'currentq';
		}
		
		if(empty($got['qtr']) && !empty($vars['qtr'])){
			$got['qtr']		= $vars['qtr'];
		}
		
		//Double check that the parameter is for a custom range rather than a quarter
		if(!empty($vars['range']) && $vars['range']	== 'qtr'){
			if(!empty($vars['qtr']) && $vars['qtr']	== 'date_range'){
				$vars['range']		= 'daterange';
				$params['range']	= 'daterange';
			}
		}
				
		
		if(empty($vars['type_title'])){
			$vars['type_title'] = '';
		}
		
		if(empty($vars['date_add_start']) && !empty($vars['date_range_start'])){
			$params['date_add_start']	= strtotime($vars['date_range_start']);
			$data_start				= $params['date_add_start'];
		}
		if(empty($vars['date_add_end']) && !empty($vars['date_range_end'])){
			$params['date_add_end']	= strtotime($vars['date_range_end']);
			$data_end				= $params['date_add_end'];
		}
		
		
		switch(strtolower($vars['range'])){
			case 'qtr':
				if(empty($got['qtr'])){
					$got['qtr']									= $this->get_quarter_code_from_date(time());
				}
				$params['qtr']									= $got['qtr'];
				$q												= substr($got['qtr'], 4,1);		
				$year											= substr($got['qtr'], 0,4);					
				switch($q){
					case 1:
						$data_start 	= $year.'-01-01 00:00:00';
						$data_end 	= $year.'-03-31 23:59:59';
					break;
					case 2:
						$data_start 	= $year.'-04-01 00:00:00';
						$data_end 	= $year.'-06-30 23:59:59';
					break;
					case 3:
						$data_start 	= $year.'-07-01 00:00:00';
						$data_end 	= $year.'-09-30 23:59:59';
					break;
					case 4:
						$data_start 	= $year.'-10-01 00:00:00';
						$data_end 	= $year.'-12-31 23:59:59';
					break;
				}
				$params['date_add_end'] 			= strtotime($data_end);
				$params['date_add_start'] 			= strtotime($data_start);
				$params['qtr_name']					= 'Q'.$q;
				$params['qtr_year']					= $year;
				$params['qtr_slug']					= $params['qtr'];
				$params['title']					= $vars['type_title'].date('F, Y',$params['date_add_start']).' - '.date('F, Y',$params['date_add_end']).' ('.$params['qtr_name'].')';	
			break;
			case 'daterange':
			case 'date_range':
			
				$start			= 0;
				$end				= 0;
				$arr_starts 	= array('date_start', 'datestart', 'start');
				$arr_ends		= array('date_end', 'dateend','end');
				foreach($arr_starts as $cur_start){
					if(empty($start) && !empty($posted[$cur_start])){
						$start 	= strtotime($posted[$cur_start].' 00:00:00');
					}
					if(empty($start) && !empty($got[$cur_start])){
						$start 	= strtotime($got[$cur_start].' 00:00:00');
					}
				}
				foreach($arr_ends as $cur_end){
					if(empty($end) && !empty($posted[$cur_end])){
						$end 	= strtotime($posted[$cur_end].' 23:59:59');
					}
					if(empty($end) && !empty($got[$cur_end])){
						$end 	= strtotime($got[$cur_end].' 23:59:59');
					}
				}
				
				if(empty($vars['type_title'])){
					$vars['type_title']		= 'Report ';
				}

				
				if(!empty($start)){
					if(empty($end)){
						$end 								= time();
					}
					$params['date_add_end'] 			= $end;
					$params['date_add_start'] 			= $start;
					$params['title']								= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);	
				}

				
			break;
			case 'currentq':
				$q 											= ceil(date('m') / 3);
				switch($q){
					case 1:
						$data_start 	= date('Y').'-01-01 00:00:00';
						$data_end 	= date('Y').'-03-31 23:59:59';
						$year			= date('Y');
					break;
					case 2:
						$data_start 	= date('Y').'-04-01 00:00:00';
						$data_end 	= date('Y').'-06-30 23:59:59';
						$year			= date('Y');
					break;
					case 3:
						$data_start 	= date('Y').'-07-01 00:00:00';
						$data_end 	= date('Y').'-09-30 23:59:59';
						$year			= date('Y');
					break;
					case 4:
						$data_start 	= date('Y').'-10-01 00:00:00';
						$data_end 	= date('Y').'-12-31 23:59:59';
						$year			= date('Y');
					break;
				}
					
				$params['date_add_end'] 			= strtotime($data_end);
				$params['date_add_start'] 			= strtotime($data_start);
				$params['qtr'] 								= $year.$q;
				$params['title']								= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;				
			case 'lastq':
			case 'nextq':
				$q 											= ceil(date('m') / 3);
				
				
				if($vars['range'] == 'lastq'){
					$q = $q - 1;	
				}else{
					$q = $q + 1;	
				}

				switch($q){
					case 1:
					case 5:
						$data_start 	= date('Y').'-01-01 00:00:00';
						$data_end 	= date('Y').'-03-31 23:59:59';
						$year			= date('Y');
					break;
					case 2:
						$data_start 	= date('Y').'-04-01 00:00:00';
						$data_end 	= date('Y').'-06-30 23:59:59';
						$year			= date('Y');
					break;
					case 3:
						$data_start 	= date('Y').'-07-01 00:00:00';
						$data_end 	= date('Y').'-09-30 23:59:59';
						$year			= date('Y');
					break;
					case 4:
					case 0:
						$data_start 	= (date('Y')-1).'-10-01 00:00:00';
						$data_end 		= (date('Y')-1).'-12-31 23:59:59';
						$year			= date('Y');
					break;
				}
					
				$params['date_add_end'] 			= strtotime($data_end);
				$params['date_add_start'] 			= strtotime($data_start);
				$params['qtr'] 						= $year.$q;
				$params['title']					= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;	
			case 'lastyear':
			case 'last365days':
			case '365':
				$params['date_add_end'] 			= time();
				$params['date_add_start'] 			= time() - (86400 * 365);
				$params['title']								=$vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;	
			case 'last180':
			case 'last180days':
			case '180':
				$params['date_add_end'] 			= time();
				$params['date_add_start'] 			= time() - (86400 * 180);
				$params['title']								= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;
			case 'last90':
			case 'last90days':
			case '90':
				$params['date_add_end'] 			= time();
				$params['date_add_start'] 			= time() - (86400 * 90);
				$params['title']								= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;
			case 'last60':
			case 'last60days':
			case '60':
				$params['date_add_end'] 			= time();
				$params['date_add_start'] 			= time() - (86400 * 10);
				$params['title']								= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;
			case 'q1':
				$data_start 									= date('Y').'-01-01 00:00:00';
				$data_end 										= date('Y').'-03-31 23:59:59';
				$params['qtr'] 								= date('Y').'1';
				$params['date_add_end'] 			= strtotime($data_end);
				$params['date_add_start'] 			= strtotime($data_start);
				$data['title']									= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;	
			case 'q2':
				$data_start 									= date('Y').'-04-01 00:00:00';
				$data_end 										= date('Y').'-06-30 23:59:59';
				$params['qtr'] 								= date('Y').'2';
				$params['date_add_end'] 			= strtotime($data_end);
				$params['date_add_start'] 			= strtotime($data_start);
				$data['title']									= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;	
			case 'q3':
				$data_start 										= date('Y').'-07-01 00:00:00';
				$data_end 										= date('Y').'-09-30 23:59:59';
				$params['qtr'] 								= date('Y').'3';
				$params['date_add_end'] 			= strtotime($data_end);
				$params['date_add_start'] 			= strtotime($data_start);
				$data['title']									= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;
			case 'q4':
				$data_start 									= date('Y').'-10-01 00:00:00';
				$data_end 									= date('Y').'-12-31 23:59:59';
				$params['qtr'] 								= date('Y').'4';
				$params['date_add_end'] 			= strtotime($data_end);
				$params['date_add_start'] 			= strtotime($data_start);
				$data['title']									=$vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;	
			case 'yearfromqtr':
				$year									= substr($vars['qtr'],0,4);
				$data_start 							= $year.'-01-01 00:00:00';
				$data_end 								= $year.'-12-31 23:59:59';
				$params['date_add_end'] 				= strtotime($data_end);
				$params['date_add_start'] 				= strtotime($data_start);
				$data['title']							=$vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;
			default:
				$params['date_add_end'] 			= time();
				$params['date_add_start'] 			= time() - (86400 * 30);
				$params['title']								= $vars['type_title'].date('m/d/Y',$params['date_add_start']).' - '.date('m/d/Y',$params['date_add_end']);
			break;
		}
		
		if(!empty($vars['debug'])){
			//dds($vars, 'Debugged');
		}
		
		return $params;
	}
	
	function quarter_name_dropdown($name='state', $selected=NULL, $id=NULL, $class=NULL, $vars=NULL) {
			$year		= 2017;
			$qtr		= 3;
			$end		= date('Y')+1;
			$qtr_end	= $this->get_current_quarter_code();
			$arr		= array();
			
			while($qtr < 5 && $year < $end){
				$cur_qtr		= $year.$qtr;
				if($cur_qtr <= $qtr_end){
					$arr[$cur_qtr] = $year.' - Q'.$qtr;
				}
				$qtr++;
				if($qtr == 5){
					$qtr 	= 1;
					$year++;
				}
			}
			
			uksort($arr, function($a, $b){
				if($a === $b){
					return 0;
				}else{
					return ($a>$b)?-1:1;
				}
			});
			

			$extra = '';
			if ( ! is_null($id)) {
				$extra .= 'id="' . $id . '" ';

			if ( ! is_null($class)) {
				$extra .= 'class="' . $class . '" ';
			}
						}
			if ( !empty($vars['disabled'])) {
				$extra .= 'disabled ';
			}
			
			$extra = substr($extra, 0, -1);

			$r = '<select name="'.$name.'"'.$extra.'>';

			if(!empty($vars['limiter_view'])){
				$r .= '<option value="">All Quarters</option>';
			}else{
				$r .= '<option value="">Select a quarter</option>';
			}
			
			if(!empty($vars['show_range_option'])){
				$r .= '<option value="date_range">Custom Date Range</option>';
			}
			
			foreach($arr as $cur_qtr => $qtr_name){
				if(!empty($selected) && $cur_qtr == $selected){
					$select 		= 'selected="selected"';
				}else{
					$select		= null;
				}
				$r .= '<option value="'.$cur_qtr.'" '.$select.'>'.$qtr_name.'</option>';
			}
			
			
			$r .= '</select>';
			return $r;
	}
 
 
	function get_checked_state($vars){
	 
		if(empty($vars['value'])){
			$val = false;
		}
		
		
		if(!empty($vars['return'])){
			$return	= hash_challenge($vars['return']);
		}else{
			$return = 'icon';
		}
		
		
			
		
		$val = $this->website_model->get_boolean_from_import_value($vars['value']);
		
		switch($return){
			case 'icon':
				if($val){
					return '<i class="fa fa-check"></i>';
				}else{
					if(!empty($vars['null_on_no'])){
						return null;
					}
					return '<i class="fa fa-times"></i>';
				}			
			break;
			case 'yn':
				if($val){
					return 'Y';
				}else{
					if(!empty($vars['null_on_no'])){
						return null;
					}
					return 'N';
				}			
			break;
			case 'yesno':
				if($val){
					return 'Yes';
				}else{
					if(!empty($vars['null_on_no'])){
						return null;
					}
					return 'No';
				}			
			break;
		
		}
		
		
	 
	}
	
	function get_sql_custom_date_range($vars){
		$r = null;
		if(empty($vars['sql_field'])){
			$vars['sql_field'] = 'date_add';
		}
		
		if(empty($vars['date_range_start']) && !empty($vars['params']['date_add_start'])){
			$vars['date_range_start']	= $vars['params']['date_add_start'];
		}
		
		if(empty($vars['date_range_end']) && !empty($vars['params']['date_add_end'])){
			$vars['date_range_end']	= $vars['params']['date_add_end'];
		}
		
		if(!empty($vars['date_range_start'])){
			if(!is_numeric($vars['date_range_start'])){
				$vars['date_range_start'] = strtotime($vars['date_range_start']);
			}
			$r = " AND ".$vars['sql_field']." >= ".$vars['date_range_start'];
		}
		if(!empty($vars['date_range_end'])){
			if(!is_numeric($vars['date_range_end'])){
				$vars['date_range_end'] = strtotime($vars['date_range_end']);
			}
			$r = " AND ".$vars['sql_field']." <= ".$vars['date_range_end'];
		}
		if(!empty($vars['date_range_start']) && !empty($vars['date_range_end'])){
			$r = " AND ".$vars['sql_field']." >= ".$vars['date_range_start']." AND ".$vars['sql_field']." <= ".$vars['date_range_end'];
		}
		
		return $r;
	}
	
	function make_report_filename($vars){
		$file 				= '';
		$ext 				= '';
		$extra 				= '';
		$vars['format']		= !empty($vars['format']) ? $vars['format'] : 'pdf';
		$vars['report']		= !empty($vars['report']) ? $vars['report'] : null;
		
		//dds($vars);
		
		switch(strtolower($vars['report'])){
			case 'map_church_report':
			case 'fam_update':
			
				$file = 'FAM_Update';
				
				if(!empty($vars['data']['church_name'])){
					$file .= '_'.str_replace(' ', '_', $vars['data']['church_name']);
				}
				if(!empty($vars['data']['map_qtr'])){
					$file .= '_'.substr($vars['data']['map_qtr'], 0, 4);
					
					if(substr($vars['data']['map_qtr'], 4,1) < 3){
						$file .= "_Mid_Year";
					}
				}
				
			break;
		}
		
		switch(strtolower($vars['format'])){
			case 'pdf':
				$ext = 'pdf';
			break;
		}
		
		return $file.$extra.'.'.$ext;
	}
	
}//End Class
?>